<!-- <template>
    <div class="alert-box-item">
        <div class="bigImg-div" @click="GetImg">
            <img class="bigImg" :src=picurl v-if="picurl">
        </div>
    </div>

</template> -->
<template>

    <div class="main" style="background-color:transparent">
        <el-row v-if="temp.isdisplay==false">
            <el-col :span="24" class="dvbox" id="dvbox">
                <div ref='threeDom' id="threeDom" class="model" v-if="picurl"></div>
                <!-- <img class="bigImg" :src=picurl v-if="picurl"> -->
                <!-- threejs渲染槽 -->
                <!-- <Pano source="../../public/img/home3.jpeg" style="height:600px ;"></Pano> -->
            </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row v-if="temp.isdisplay==false" style="margin-top:20px ;width: 85%;">
            <!-- 第一列 -->
            <el-col :span="12">
                <!-- threejs图片 -->
                <img src="../assets/rt.png" class="rt1" alt="Power.">
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
                <!-- 按钮,开启\关闭自动滚动 -->
                <el-switch inactive-text="自动滚动开启" active-text="自动滚动关闭" class="switch" v-model="isRotate"
                    @change="Action" active-value="0" inactive-value="1" inactive-color="#ffd000" active-color="black">
                </el-switch>
            </el-col>


        </el-row>
        <!-- 第三行 -->
        <el-row v-if="temp.isdisplay==false">
            <el-col :span="24">
                <img class="tip3" src="../assets/tip.png">
                <!-- 交互提示 -->
            </el-col>
        </el-row>
        <div v-if="temp.isdisplay==true" class="midbox">
            <img src="../assets/lif.png" class="lif" alt="lif">

            <!-- <div class="dvbox">
                <img class="bigImg" :src=picurl v-if="picurl">
            </div> -->
            <div class="btn" @click="GetImg">
                <p>UPLOAD</p>
            </div>
        </div>
        <img v-if="temp.isdisplay==true" class="btnpic" src="../assets/upl.png" alt="upload">
    </div>
</template>
<script>
    import axios from 'axios';
    //异步跨域处理
    import * as THREE from "three";
    import * as TrackballControls from 'three-trackballcontrols'
    import * as ThreeStats from 'three-stats'
    import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
    //操作控件
    const OrbitControls = require('three-orbit-controls')(THREE);
    import * as PANOLENS from 'panolens';
    import { Pano } from 'vuejs-vr';

    let Pictures = null
    export default {
        data() {
            return {
                picurl: '',
                img1: '',
                //isRotate: 0,
                //vue数据容器
                renderer: '', //渲染器
                scene: '', //场景
                light: '', //光源
                camera: '', //相机
                controls: '', //控制器
                stats: '', //性能监控器
                css_Group: '', //模型组
                action: '', //控制动画
                clock: '', //时钟
                mixer: '', //混合实例
                rotateAnimate: '', //旋转动画
                isRotate: 0, //是否开启旋转,由switch监听
                value: true,
                //dispaly数据
                temp: {
                    isdisplay: true,
                    img: ''
                }

            }
        },

        components: {
            Pano
        },
        methods: {
            //图片读取方法
            GetImg() {
                if (Pictures === null) {
                    // 生成文件上传的控件
                    Pictures = document.createElement('input')
                    Pictures.setAttribute('type', 'file')
                    Pictures.style.display = 'none'
                    // 更改视图
                    if (window.addEventListener) {
                        Pictures.addEventListener('change', this.uploadFile, false)
                    } else {
                        Pictures.attachEvent('onchange', this.uploadFile)
                    }

                    document.body.appendChild(Pictures)
                }
                Pictures.click()
            },
            uploadFile(el) {
                this.$set(this.temp, 'isdisplay', false);
                this.$message({
                    duration: 5000,//设置提示时间
                    message: '全景图生成中，请耐心等待十秒',
                    type: 'warning'
                });

                if (el && el.target && el.target.files && el.target.files.length > 0) {
                    //this.$set(this.temp, 'img', el);

                    const files = el.target.files[0]
                    const isLt2M = files.size / 1024 / 1024 < 100
                    //大小限制100MB
                    const size = files.size / 1024 / 1024
                    console.log(size)
                    // 判断上传文件的大小
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过100MB!')
                    } else if (files.type.indexOf('image') === -1) { //如果不是图片格式
                        // this.$dialog.toast({ mes: '请选择图片文件' });
                        this.$message.error('请选择图片文件');
                    } else {
                        const that = this;
                        const reader = new FileReader(); // 创建读取文件对象
                        reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                        reader.onload = function () { // 文件读取完成后
                            // 读取完成后，将base64编码结果赋值给img的src
                            that.picurl = this.result;
                            console.log(this.result);
                        };

                        setTimeout(() => {
                            this.init();
                        }, 4000)    // 等待dom挂起


                    }
                }

            },

            // threejs方法
            init() {
                //this.$refs.threeDom.addEventListener('dblclick', this.DoubleClick); //监听双击事件
                this.css_Renderer(); //初始化渲染器
                this.css_scene(); //初始化场景
                this.css_camera(); //创建相机
                this.css_control(); //初始化控制器
                this.css_prop(); //性能监控
                this.css_model(); //建立模型
            },

            css_model() {
                //模型建立函数
                this.css_Group = new THREE.Group();
                var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		

                //加载全景图资源
                const image = new Image();
                image.src = this.picurl;    // 读取base64编码
                var texture1 = new THREE.Texture();
                texture1.image = image;
                image.onload = function () {
                    texture1.needsUpdate = true;
                };
                var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
                var material = new THREE.MeshLambertMaterial({
                    map: texture1, //将编码作为纹理贴图
                    side: THREE.DoubleSide, //使摄像头内部能够看到贴图,双面渲染
                });
                var meshSphere = new THREE.Mesh(geometry, material); //网格模型对象Mesh	
                meshSphere.name = '球体容器';
                this.css_Group.add(meshSphere);

                //标签
                var canvasText = this.getcanvers('闪现'); //生成一个canvers 文字图案对象
                var texture = new THREE.CanvasTexture(canvasText);
                var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60);
                var materialText = new THREE.MeshPhongMaterial({
                    map: texture, // 设置纹理贴图
                    side: THREE.DoubleSide,
                });
                var meshText = new THREE.Mesh(geometryText, materialText);
                meshText.name = 'csspano';
                meshText.position.set(40, 20, -90);
                //this.css_Group.add(meshText);

                this.scene.add(this.css_Group);
                this.addAnimation(); //添加并开启动画
                this.refresh();
                this.$message({
                    duration: 3000,//设置提示时间
                    message: '生成完成',
                    type: 'success'
                });
            },

            Action(val) { //开启和关闭旋转
                if (val == 0) { //关闭控制台		
                    this.action.paused = true;
                } else {
                    this.action.paused = false;
                }
            },

            addAnimation() { //添加并开启动画
                this.clock = new THREE.Clock(); // three.js 时钟对象
                var times = [0, 3600]; //	创建帧动画序列
                var position_x = [0, 360]; //离散属性值
                var keyframe = new THREE.KeyframeTrack('meshSphere.rotation[y]', times, position_x);
                var duration = 100; //持续时间
                var cilp = new THREE.AnimationClip('sphereRotate', duration, [keyframe]); //剪辑 keyframe对象
                this.mixer = new THREE.AnimationMixer(this.css_Group); //动画混合实例
                this.action = this.mixer.clipAction(cilp);
                this.action.timeScale = 1; //播放速度
                this.action.setLoop(THREE.LoopPingPong).play(); //开始播放 像乒乓球一样在起始点与结束点之间来回循环
                this.animate(); //开启动画
            },

            animate() { //循环渲染
                this.rotateAnimate = requestAnimationFrame(this.animate);
                this.renderer.render(this.scene, this.camera);
                this.update();
            },

            update() { //数据更新
                this.stats.update();
                this.mixer.update(this.clock.getDelta());
            },

            css_Renderer() { //初始化渲染器
                var width = 1100; //窗口宽度
                var height = 600; //窗口高度

                //this.renderer = new THREE.WebGLRenderer(); //创建渲染器
                this.renderer = new THREE.WebGLRenderer({
                    antialias: true,     //抗锯齿
                });
                this.renderer.setClearColor(0xffffff); //添加背景颜色
                this.renderer.setSize(width, height); // 设定渲染器尺寸
                this.renderer.setPixelRatio(window.devicePixelRatio);
                setTimeout(() => {
                    this.$refs.threeDom.appendChild(this.renderer.domElement);
                }, 2000)

            },

            css_scene() { //初始化场景 并向场景添加光源和辅助坐标系
                this.scene = new THREE.Scene();
                var ambient = new THREE.AmbientLight(0x444444, 3); //添加光源  颜色和光照强度
                var axisHelper = new THREE.AxesHelper(0); //添加辅助坐标系
                this.scene.add(ambient, axisHelper);
            },

            css_camera() { //初始化相机
                console.log("camera");
                var width = 1100; //窗口宽度
                var height = 800; //窗口高度
                this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000); //使用透视相机
                this.camera.position.set(0, 0, 10); //设置相机位置
                this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
            },

            css_control() { //初始化控制器
                this.controls = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
                this.controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
                this.controls.minDistance = 10; // 设置移动的最短距离（默认为零）
                this.controls.maxPolarAngle = Math.PI; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
                this.controls.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
                this.controls.enablePan = false; //禁用右键功能
                this.controls.addEventListener('change', this.refresh); //监听鼠标、键盘事件 让整个控件可以拖动
            },

            css_prop() { //初始化性能监控
                this.stats = new ThreeStats.Stats(); // 创建一个性能监视器	
                this.stats.dom.style.position = 'absolute';
                this.stats.dom.style.top = '-4px';
                //setTimeout(() => {
                //this.$refs.property.appendChild(this.stats.dom);
                //}, 15000)

                this.stats.update();
            },

            getcanvers(text) { //生成一个canvers图案
                var canvasText = document.createElement("canvas");
                var c = canvasText.getContext('2d');
                // 矩形区域填充背景
                c.fillStyle = "rgba(255,215,0,0.1)";
                c.backgroundColor = "rgba(255,215,0,0.3)"; //背景颜色
                c.border = "thin dotted #FF0000";
                c.borderRadius = "20px";
                c.fillRect(0, 0, 300, 200); //生成一个矩形
                c.translate(160, 80);
                c.fillStyle = "black"; //文本填充颜色
                c.font = "bold 100px 等线"; //字体样式设置
                c.textBaseline = "middle"; //文本与
                c.textAlign = "center"; //文本居中
                c.fillText(text, 0, 0);

                var texture = new THREE.CanvasTexture(canvasText); //Canvas纹理
                var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60); //生成一个矩形平面
                var materialText = new THREE.MeshPhongMaterial({
                    map: texture, // 设置纹理贴图
                    side: THREE.DoubleSide, //双面渲染
                });
                var meshText = new THREE.Mesh(geometryText, materialText);
                meshText.name = text;
                meshText.position.set(190, 140, 90);
                return canvasText;
            },

            refresh() { //刷新页面 
                this.renderer.render(this.scene, this.camera); //执行渲染操作
                this.stats.update(); //更新性能监控的值			
            },

            DoubleClick(event) { //触发双击事件
                // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
                var intersects = this.getIntersects(event);
                if (intersects.length != 0) {
                    for (var item of intersects) {
                        if (item.object.name != '') { //找到第一个不等于空的模型 就是自定义最近的模型
                            this.action.paused = true; //停止旋转			
                            this.$confirm('是否切换场景?', '提示', {
                                confirmButtonText: '切换',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.action.paused = false; //开启旋转
                                if (item.object.name == '闪现') {
                                    this.changeScene('enter'); //改变页面场景
                                } else if (item.object.name == '返回') {
                                    this.changeScene('backtrack'); //改变页面场景
                                }
                            }).catch(() => {
                                this.action.paused = false; //开启旋转
                            });
                            break;
                        }
                    }
                } else { //这里是未选中状态
                }
            },

            changeScene(type) {
                var img = '';
                var names = '';
                var canvasText = '';
                var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
                if (type == 'enter') {
                    img = textureLoader.load(this.picurl); //vue加载图表需要用 require形式
                    canvasText = this.getcanvers('返回'); //生成一个canvers 文字图案对象	
                    names = '返回';
                } else if (type == 'backtrack') { //返回房间
                    img = textureLoader.load(this.picurl); //vue加载图表需要用 require形式	
                    canvasText = this.getcanvers('闪现'); //生成一个canvers 文字图案对象	
                    names = '闪现';
                }

                for (var item of this.scene.children[2].children) {
                    if (item.name == '球体容器') { //切换贴图 进入下一张贴图					
                        var material = new THREE.MeshLambertMaterial({
                            map: img, //设置颜色贴图属性值
                            side: THREE.DoubleSide, //双面渲染
                        });
                        item.material = material;
                    } else if (item.name == '闪现' || item.name == '返回') {
                        var texture = new THREE.CanvasTexture(canvasText);
                        var materialText = new THREE.MeshPhongMaterial({
                            map: texture, // 设置纹理贴图
                            side: THREE.DoubleSide, //双面渲染
                        });

                        item.name = names; //改名模型的名字
                        item.material = materialText;
                    }
                }

                setTimeout(() => { //延迟刷新
                    this.refresh();
                }, 100)

            },

            getIntersects(event) { // 获取与射线相交的对象数组
                event.preventDefault();
                // 声明 raycaster 和 mouse 变量
                var raycaster = new THREE.Raycaster(); //生成射线
                var mouse = new THREE.Vector2();
                var container = this.$refs.threeDom;
                let getBoundingClientRect = container.getBoundingClientRect();
                // 通过鼠标点击位置,计算出 raycaster 所需点的位置 分量,以屏幕为中心点,范围 -1 到 1
                mouse.x = ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) * 2 - 1;
                mouse.y = -((event.clientY - getBoundingClientRect.top) / container.offsetHeight) * 2 + 1;
                //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
                raycaster.setFromCamera(mouse, this.camera);
                // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
                var intersects = raycaster.intersectObjects(this.scene.children[2].children);
                //返回选中的对象
                return intersects;
            },
        },
        beforeDestroy() {
            if (Pictures) {
                if (window.addEventListener) {
                    Pictures.removeEventListener('change', this.onGetLocalFile, false)
                } else {
                    Pictures.detachEvent('onchange', this.onGetLocalFile)
                }
                document.body.removeChild(Pictures)
                Pictures = null
                console.log('destroy')
            }
        },


    }
</script>

<style>
    .alert-box-item {
        overflow: hidden;
    }

    .bigImg-div {
        width: 200px;
        height: 200px;
        /*border-radius: 100%;*/
        overflow: hidden;
        border: 1px solid #ddd;
    }

    .bigImg {
        display: block;
        width: 1100px;
        height: 600px;
        /*border-radius: 100%;*/
    }
</style>
<style scoped>
    .dvbox {
        /*显示器*/
        width: 1100px;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 10px 10px #faf2b395;
        cursor: pointer;
    }

    .btnpic {
        width: 80%;
        height: auto;
        position: relative;
        top: 580px;
        left: 20px;
    }

    .midbox {
        height: 500px;
        position: absolute;
        left: 650px;
        width: 1000px;
    }

    .btn {
        height: 50px;
        width: 130px;
        position: relative;
        left: 141px;
        background-color: #FFC300;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        padding: 1px;
        border-radius: 50px;
        transition: all 1s ease-in-out;
    }

    .btn:hover {
        background-color: #ffc400a3;
        box-shadow: 10px 10px 10px rgba(252, 223, 105, 0.54);
    }

    .lif {
        height: 400px;
        width: 400px;
    }

    .lif {
        animation: mymove 5s infinite;
        -webkit-animation: mymove 5s infinite;
    }

    @keyframes mymove {
        0% {
            transform: translate(0px, 0px);
        }

        50% {
            transform: translate(0px, -20px);
        }

        100% {
            transform: translate(0px, 0px);
        }
    }
</style>
<style scoped>
    /*性能检测控件*/
    .cardmini {
        position: relative;
        opacity: 0.0;
    }

    .rt1 {
        /*threejs提示*/
        height: 25px;
    }

    .tip3 {
        /*交互提示*/
        width: 87%;
        z-index: -1;
        margin-top: 100px;
    }

    .switch {
        float: right;
    }

    .dvbox {
        /*显示器*/
        width: 1100px;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 10px 10px #faf2b395;
        cursor: pointer;
    }
</style>