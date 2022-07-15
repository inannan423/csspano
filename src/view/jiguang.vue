<template>
    <div class="main">
        <audio
            src="https://6e61-nannan-1g1q4u2i02398ecf-1311679880.tcb.qcloud.la/%E6%B8%A9%E9%A6%A8%E7%9A%84%E5%90%89%E4%BB%96%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90_%E8%80%B3%E8%81%86%E7%BD%91_%5B%E5%A3%B0%E9%9F%B3ID%EF%BC%9A38313%5D.mp3?sign=7f0c022de3a8fc2d739fbd36a56d37f9&t=1657866949"
            controls ref="MusicPlay" loop='true' autoplay="autoplay"></audio>
        <div class="cardmini">
            <span ref='property'></span>
            <!-- 性能检测空间，已隐藏 -->
        </div>
        <!-- 第一行 -->
        <el-row>
            <el-col :span="24" class="dvbox">
                <div ref='threeDom' class="model"></div>
                <!-- threejs渲染槽 -->
            </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row style="margin-top:20px ;width: 85%;">
            <!-- 第一列 -->
            <el-col :span="12">
                <!-- threejs图片 -->
                <img src="../assets/rt.png" class="rt1" alt="Power.">
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
                <!-- 按钮,开启\关闭自动滚动 -->
                <el-switch inactive-text="自动滚动开启" active-text="自动滚动关闭" class="switch" v-model="isRotate"
                    active-value="0" inactive-value="1" inactive-color="#ffd000" active-color="black" @change="Action">
                </el-switch>
            </el-col>


        </el-row>
        <!-- 第三行 -->
        <el-row>
            <el-col :span="24">
                <img class="tip3" src="../assets/tip.png">
                <!-- 交互提示 -->
            </el-col>
        </el-row>
    </div>
</template>
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
<script>
    //音频
    // //引用文件
    // import mp3 from "../../public/img/天黑黑.mp3";
    // //定义变量
    // let  audio=null;	

    import axios from 'axios';
    //异步跨域处理
    import * as THREE from "three";
    import * as TrackballControls from 'three-trackballcontrols'
    import * as ThreeStats from 'three-stats'
    import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
    //操作控件
    const OrbitControls = require('three-orbit-controls')(THREE);

    export default {
        props: {
            msg: String
        },
        data() {
            return {
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
                value: true
            }
        },

        mounted() {
            //钩子函数，在页面渲染完成后执行的dom操作
            this.init(); //初始化
            //that.$nextTick(function () {
            //	this.init()
            //});

        },

        methods: {
            //js方法写在这里面
            init() {
                this.$refs.threeDom.addEventListener('dblclick', this.DoubleClick); //监听双击事件
                this.css_Renderer(); //初始化渲染器
                this.css_scene(); //初始化场景
                this.css_camera(); //创建相机
                this.css_control(); //初始化控制器
                this.css_prop(); //性能监控
                this.css_model(); //建立模型
                this.$parent.$refs.MusicPlay.play();
            },
            //	监听开关
            Action(val) { //开启和关闭旋转
                if (val == 0) { //关闭控制台		
                    this.action.paused = true;
                } else {
                    this.action.paused = false;
                }
            },

            css_model() {
                //模型建立函数
                this.css_Group = new THREE.Group();
                var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
                var img = textureLoader.load(require('../../public/img/jiguang.jpg'));
                //加载全景图资源

                var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
                var material = new THREE.MeshLambertMaterial({
                    map: img, //设置贴图属性
                    side: THREE.DoubleSide, //使摄像头内部能够看到贴图,双面渲染
                });
                var meshSphere = new THREE.Mesh(geometry, material); //网格模型对象Mesh	
                meshSphere.name = '全景球';
                this.css_Group.add(meshSphere);

                //标签
                var canvasText = this.getcanvers('内景'); //生成一个canvers 文字图案对象
                var texture = new THREE.CanvasTexture(canvasText);
                var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60);
                var materialText = new THREE.MeshPhongMaterial({
                    map: texture, // 设置纹理贴图
                    side: THREE.DoubleSide,
                });
                var meshText = new THREE.Mesh(geometryText, materialText);
                meshText.name = '内景';
                meshText.position.set(40, 20, -90);
                this.css_Group.add(meshText);
                this.scene.add(this.css_Group);
                this.addAnimation(); //开启动画
                this.refresh();
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
                this.action.setLoop(THREE.LoopPingPong).play(); //开始播放
                this.loop(); //开启动画
            },

            loop() { //循环渲染
                this.rotateAnimate = requestAnimationFrame(this.loop);
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
                    //precision: highp	//高精度
                });
                this.renderer.setSize(width, height); // 设定渲染器尺寸
                this.renderer.setClearColor(0xffffff);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.$refs.threeDom.appendChild(this.renderer.domElement);
            },

            css_scene() { //初始化场景 并向场景添加光源和辅助坐标系
                this.scene = new THREE.Scene();	// 创建场景

                var ambient = new THREE.AmbientLight(0x444445, 3); //添加环境光源颜色和光照强度
                var axisHelper = new THREE.AxesHelper(0); //隐藏坐标系
                this.scene.add(ambient, axisHelper);//渲染
            },

            css_camera() { //初始化相机
                var width = 1100; //窗口宽度
                var height = 800; //窗口高度
                this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000); //使用透视相机
                this.camera.position.set(0, 0, 10); //设置相机位置
                this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
            },

            css_control() { //初始化控制器
                this.controls = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
                this.controls.target.set(0, 0, 0); // 控制器的焦点
                this.controls.maxPolarAngle = Math.PI; //绕垂直轨道的距离
                this.controls.minDistance = 0;
                this.controls.maxDistance = 70; // 最大放大
                this.controls.enablePan = false;
                this.controls.addEventListener('change', this.refresh); //监听鼠标、键盘事件
            },

            css_prop() { //初始化性能监控
                this.stats = new ThreeStats.Stats(); // 创建一个性能监视器	
                this.stats.dom.style.position = 'absolute';
                this.stats.dom.style.top = '-4px';
                this.$refs.property.appendChild(this.stats.dom);
                this.stats.update();
            },

            getcanvers(text) { //生成一个canvers图案
                var canvasText = document.createElement("canvas");
                var cans = canvasText.getContext('2d');
                // 矩形区域填充背景
                cans.fillStyle = "rgba(125,125,200,0.5)";
                cans.backgroundColor = "rgba(255,215,0,0.3)"; //背景颜色
                cans.border = "thin dotted #FF0000";
                cans.borderRadius = "20px";
                cans.fillRect(0, 0, 300, 200); //生成矩形
                cans.translate(160, 80);
                cans.fillStyle = "black"; //文本颜色
                cans.font = "bold 100px 等线"; //字体样式
                cans.textBaseline = "middle";
                cans.textAlign = "center"; //文本居中
                cans.fillText(text, 0, 0);

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
                event.preventDefault();
                // 声明 raycaster 和 mouse 变量
                var raycaster = new THREE.Raycaster(); //生成射线
                var mouse = new THREE.Vector2();
                var container = this.$refs.threeDom;
                let getBoundingClientRect = container.getBoundingClientRect();
                // 通过鼠标点击位置,计算出 raycaster 所需点的位置 分量,以屏幕为中心点,范围 -1 到 1 （归一化）
                mouse.x = ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) * 2 - 1;
                //	获取归一化之后的鼠标x坐标，创建新的原点
                mouse.y = -((event.clientY - getBoundingClientRect.top) / container.offsetHeight) * 2 + 1;
                //	获取归一化之后的鼠标y坐标，创建新的原点
                raycaster.setFromCamera(mouse, this.camera);
                // 用新的原点和方向来更新射线
                var intersects = raycaster.intersectObjects(this.scene.children[2].children);
                if (intersects.length != 0) {
                    for (var item of intersects) {
                        if (item.object.name == '内景' || item.object.name == '返回') { //找到第一个不等于空的模型 就是自定义最近的模型
                            this.action.paused = true; //停止旋转			
                            this.$confirm('是否切换场景?', '提示', {
                                confirmButtonText: '切换',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.action.paused = false; //开启旋转
                                if (item.object.name == '内景') {
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
                }
            },

            changeScene(type) {
                this.$message({
                    duration: 5000,//设置提示时间
                    message: '资源较大，请耐心等待',
                    type: 'warning'
                });
                var img = '';
                var names = '';
                var canvasText = '';
                var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
                if (type == 'enter') {
                    img = textureLoader.load(require('../../public/img/jiguang1.jpg'));
                    canvasText = this.getcanvers('返回'); //生成一个canvers文字图案对象	
                    names = '返回';
                } else if (type == 'backtrack') { //返回
                    img = textureLoader.load(require('../../public/img/jiguang.jpg'));
                    canvasText = this.getcanvers('内景'); //生成一个canvers文字图案对象	
                    names = '内景';
                }

                for (var item of this.scene.children[2].children) {
                    if (item.name == '全景球') { //切换贴图 进入下一张贴图					
                        var material = new THREE.MeshLambertMaterial({
                            map: img, //设置颜色贴图属性值
                            side: THREE.DoubleSide, //双面渲染
                        });
                        item.material = material;
                    } else if (item.name == '内景' || item.name == '返回') {
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
        }
    }
</script>