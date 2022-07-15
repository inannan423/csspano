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
					active-value="0" inactive-value="1" inactive-color="#ffd000" active-color="black" @change="isSpin">
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
	import axios from 'axios';
	//异步跨域处理
	import * as THREE from "three";
	import * as TrackballControls from 'three-trackballcontrols'
	import * as ThreeStats from 'three-stats'
	import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
	//操作控件
	const OrbitControls = require('three-orbit-controls')(THREE);
	var materialText1;//设置全局的文字材质，双击时，改变解释文字的可见性
	var materialText2;
	var materialText3;
	var materialText4;
	var sceneName;//设置全局的场景名字，不同场景需要有不同图标
	var material_heart;//设置全局的图标材质，改变场景，改变图标的可见性
	var material_heart2;//设置全局的图标材质，改变场景，改变图标的可见性
	var material_heart3;//设置全局的图标材质，改变场景，改变图标的可见性
	var material_heart4;//设置全局的图标材质，改变场景，改变图标的可见性

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
				mygroup: '', //模型组
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
		},

		methods: {
			//js方法写在这里面
			init() {
				this.$refs.threeDom.addEventListener('dblclick', this.onMouseDblclick); //监听双击事件
				this.rendererInit(); //初始化渲染器
				this.sceneInit(); //初始化场景
				this.cameraInit(); //创建相机
				this.controlInit(); //初始化控制器
				this.propertyInit(); //性能监控
				this.modelling(); //建立模型
			},

			modelling() {
				//模型建立函数
				this.mygroup = new THREE.Group();
				var textureLoader = new THREE.TextureLoader(); //创建纹理贴图		
				var img = textureLoader.load(require('../../public/img/jia3.jpeg'));//第一个出现的场景的全景图
				//加载全景图资源

				var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
				var material = new THREE.MeshLambertMaterial({
					map: img, //设置颜色贴图属性值
					side: THREE.DoubleSide, //使摄像头内部能够看到贴图,双面渲染
				});
				var meshSphere = new THREE.Mesh(geometry, material); //网格模型对象Mesh	
				meshSphere.name = '球体容器';
				sceneName = 'jia';//这时场景名字是"jia"
				this.mygroup.add(meshSphere);

				//标签
				var canvasText = this.getcanvers('走出'); //生成一个canvers 文字图案对象，文字是'走出'
				var texture = new THREE.CanvasTexture(canvasText);
				var geometryText = new THREE.PlaneGeometry(16, 10, 60, 60);
				var materialText = new THREE.MeshPhongMaterial({
					map: texture, // 设置纹理贴图
					side: THREE.DoubleSide,
				});
				var meshText = new THREE.Mesh(geometryText, materialText);
				meshText.name = '闪现';
				meshText.position.set(80, 20, -70);
				this.mygroup.add(meshText);

				//心型物体
				var x = 0, y = 0;
				var heartShape = new THREE.Shape();
				heartShape.moveTo(x + 5, -y + 5);
				heartShape.bezierCurveTo(x + 5, -y + 5, x + 4, -y, x, -y);
				heartShape.bezierCurveTo(x - 6, -y, x - 6, -y + 7, x - 6, -y + 7);
				heartShape.bezierCurveTo(x - 6, -y + 11, x - 3, -y + 15.4, x + 5, -y + 19);
				heartShape.bezierCurveTo(x + 12, -y + 15.4, x + 16, -y + 11, x + 16, -y + 7);
				heartShape.bezierCurveTo(x + 16, -y + 7, x + 16, -y, x + 10, -y);
				heartShape.bezierCurveTo(x + 7, -y, x + 5, -y + 5, x + 5, -y + 5);
				var geometry_heart = new THREE.ShapeGeometry(heartShape);
				material_heart = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					side: THREE.DoubleSide //双面显示
				});
				var mesh_heart = new THREE.Mesh(geometry_heart, material_heart);
				mesh_heart.name = '图标1';//一个心型，对应一个名字
				mesh_heart.position.set(-40, 20, -90);
				mesh_heart.scale.set(0.3, 0.5, 0.5);
				mesh_heart.rotation.z = Math.PI;	// 旋转摆正
				this.mygroup.add(mesh_heart);

				//心型2
				material_heart2 = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					side: THREE.DoubleSide //双面显示
				});
				var mesh_heart2 = new THREE.Mesh(geometry_heart, material_heart);
				mesh_heart2.name = '图标2';//一个心型，对应一个名字
				mesh_heart2.position.set(100, 20, 50);
				mesh_heart2.scale.set(0.6, 0.6, 0.6);
				mesh_heart2.rotation.z = Math.PI;	// 旋转摆正
				this.mygroup.add(mesh_heart2);

				//心型3
				material_heart3 = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					side: THREE.DoubleSide //双面显示
				});
				var mesh_heart3 = new THREE.Mesh(geometry_heart, material_heart);
				mesh_heart3.name = '图标3';//一个心型，对应一个名字
				mesh_heart3.position.set(-20, -10, 50);
				mesh_heart3.scale.set(0.3, 0.5, 0.5);
				mesh_heart3.rotation.z = Math.PI;	// 旋转摆正
				this.mygroup.add(mesh_heart3);

				//心型4
				material_heart4 = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					side: THREE.DoubleSide //双面显示
				});
				var mesh_heart4 = new THREE.Mesh(geometry_heart, material_heart);
				mesh_heart4.name = '图标4';//一个心型，对应一个名字
				mesh_heart4.position.set(-80, 10, -20);
				mesh_heart4.scale.set(0.3, 0.5, 0.5);
				mesh_heart4.rotation.z = Math.PI;	// 旋转摆正
				mesh_heart4.rotation.y = Math.PI * 0.5;	// 旋转摆正
				this.mygroup.add(mesh_heart4);

				//解释的文字1
				var texture1 = new THREE.TextureLoader(); //创建纹理贴图      
				var img = texture1.load(require('../../public/img/explain1.png'));//第一个出现的场景的全景图
				var geometryText1 = new THREE.PlaneGeometry(30, 15);
				materialText1 = new THREE.MeshPhongMaterial({
					map: img, // 设置纹理贴图
					side: THREE.DoubleSide,
					backgroundColor: 0xffffff
				});
				var meshText1 = new THREE.Mesh(geometryText1, materialText1);
				meshText1.name = 'explain1';
				meshText1.position.set(-30, 20, -50);
				materialText1.visible = false;//首先设置解释文字不可见
				this.mygroup.add(meshText1);

				//解释的文字2
				var texture2 = new THREE.TextureLoader(); //创建纹理贴图      
				var img = texture2.load(require('../../public/img/explain2.png'));//第一个出现的场景的全景图
				var geometryText2 = new THREE.PlaneGeometry(30, 15);
				materialText2 = new THREE.MeshPhongMaterial({
					map: img, // 设置纹理贴图
					side: THREE.DoubleSide,
					backgroundColor: 0xffffff
				});
				var meshText2 = new THREE.Mesh(geometryText2, materialText2);
				meshText2.name = 'explain2';
				meshText2.position.set(38, 15, 30);
				meshText2.rotation.y = Math.PI;	// 旋转摆正
				materialText2.visible = false;//首先设置解释文字不可见
				this.mygroup.add(meshText2);

				//解释的文字3
				var texture3 = new THREE.TextureLoader(); //创建纹理贴图      
				var img = texture3.load(require('../../public/img/explain3.png'));//第一个出现的场景的全景图
				var geometryText3 = new THREE.PlaneGeometry(30, 15);
				materialText3 = new THREE.MeshPhongMaterial({
					map: img, // 设置纹理贴图
					side: THREE.DoubleSide,
					backgroundColor: 0xffffff
				});
				var meshText3 = new THREE.Mesh(geometryText3, materialText3);
				meshText3.name = 'explain3';
				meshText3.position.set(-20, 0, 50);
				meshText3.rotation.y = Math.PI;	// 旋转摆正
				materialText3.visible = false;//首先设置解释文字不可见
				this.mygroup.add(meshText3);

				//解释的文字4
				var texture4 = new THREE.TextureLoader(); //创建纹理贴图      
				var img = texture4.load(require('../../public/img/explain4.png'));//第一个出现的场景的全景图
				var geometryText4 = new THREE.PlaneGeometry(30, 15);
				materialText4 = new THREE.MeshPhongMaterial({
					map: img, // 设置纹理贴图
					side: THREE.DoubleSide,
					backgroundColor: 0xffffff
				});
				var meshText4 = new THREE.Mesh(geometryText4, materialText4);
				meshText4.name = 'explain4';
				meshText4.position.set(-50, 20, -20);
				meshText4.rotation.y = Math.PI * 0.5;	// 旋转摆正
				materialText4.visible = false;//首先设置解释文字不可见
				this.mygroup.add(meshText4);


				this.scene.add(this.mygroup);
				this.addAnimation(); //添加并开启动画
				this.refresh();
			},

			isSpin(val) { //开启和关闭旋转
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
				this.mixer = new THREE.AnimationMixer(this.mygroup); //动画混合实例
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
				if (sceneName == "sanya")//不同场景，图标可见性不同
				{
					material_heart.visible = false;
					material_heart2.visible = false;
					material_heart3.visible = false;
					material_heart4.visible = false;
					materialText1.visible = false;
					materialText2.visible = false;
					materialText3.visible = false;
					materialText4.visible = false;
				}
				//在三亚场景中标识不可见
				else {
					material_heart.visible = true;
					material_heart2.visible = true;
					material_heart3.visible = false;
					material_heart4.visible = false;
				}

				//在其他场景中标识可见
			},

			rendererInit() { //初始化渲染器
				var width = 1100; //窗口宽度
				var height = 600; //窗口高度

				//this.renderer = new THREE.WebGLRenderer(); //创建渲染器
				this.renderer = new THREE.WebGLRenderer({
					antialias: true,     //抗锯齿
				});
				this.renderer.setClearColor(0xffffff); //添加背景颜色
				this.renderer.setSize(width, height); // 设定渲染器尺寸
				this.renderer.setPixelRatio(window.devicePixelRatio);
				this.$refs.threeDom.appendChild(this.renderer.domElement);
			},

			sceneInit() { //初始化场景 并向场景添加光源和辅助坐标系
				this.scene = new THREE.Scene();
				var ambient = new THREE.AmbientLight(0x444444, 3); //添加光源  颜色和光照强度
				var axisHelper = new THREE.AxesHelper(0); //添加辅助坐标系
				this.scene.add(ambient, axisHelper);
			},

			cameraInit() { //初始化相机
				var width = 1100; //窗口宽度
				var height = 800; //窗口高度
				this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000); //使用透视相机
				this.camera.position.set(0, 0, 10); //设置相机位置
				this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
			},

			controlInit() { //初始化控制器
				this.controls = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
				this.controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
				this.controls.minDistance = 10; // 设置移动的最短距离（默认为零）
				this.controls.maxPolarAngle = Math.PI; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
				this.controls.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
				this.controls.enablePan = false; //禁用右键功能
				this.controls.addEventListener('change', this.refresh); //监听鼠标、键盘事件 让整个控件可以拖动
			},

			propertyInit() { //初始化性能监控
				this.stats = new ThreeStats.Stats(); // 创建一个性能监视器	
				this.stats.dom.style.position = 'absolute';
				this.stats.dom.style.top = '-4px';
				this.$refs.property.appendChild(this.stats.dom);
				this.stats.update();
			},


			// //生成解释的文字
			// getcanvers1(text) { //生成一个canvers图案
			// 	var canvasText = document.createElement("canvas");
			// 	var c = canvasText.getContext('2d');
			// 	// 矩形区域填充背景
			// 	c.fillStyle = "#F0F8FF";

			// 	//c.backgroundColor = "rgba(255,215,0,0.3)"; //背景颜色
			// 	c.border = "thin dotted #FF0000";
			// 	//c.borderRadius = "20px";
			// 	c.fillRect(0, 0, 380, 380); //生成一个矩形
			// 	c.translate(160, 80);
			// 	c.fillStyle = "black"; //文本填充颜色
			// 	c.font = "bold 16px 华文中宋"; //字体样式设置
			// 	c.textBaseline = "middle";
			// 	c.textAlign = "center"; //文本居中
			// 	c.whiteSpace = "pre";
			// 	c.opacity = "0.1";
			// 	c.zIndex = "101000";
			// 	c.fillText(text, 0, 0);
			// 	return canvasText;
			// },

			//生成切换场景的文字
			getcanvers(text) { //生成一个canvers图案
				var canvasText = document.createElement("canvas");
				var c = canvasText.getContext('2d');
				// 矩形区域填充背景
				c.fillStyle = "rgba(255,215,0,0.1)";
				c.backgroundColor = "rgba(255,215,0,0.3)"; //背景颜色
				c.border = "thin dotted #FF0000";
				c.borderRadius = "20px";
				c.fillRect(0, 0, 300, 200); //生成一个矩形
				c.fillStyle = "transparent";  // 设为透明
				c.translate(160, 80);
				c.fillStyle = "black"; //文本填充颜色
				c.font = "bold 100px 等线"; //字体样式设置
				c.textBaseline = "middle"; //文本与
				c.textAlign = "center"; //文本居中
				c.fillText(text, 0, 0);
				return canvasText;
			},

			refresh() { //刷新页面 
				this.renderer.render(this.scene, this.camera); //执行渲染操作
				this.stats.update(); //更新性能监控的值			
			},

			onMouseDblclick(event) { //触发双击事件
				// 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
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
				if (intersects.length != 0) {
					for (var item of intersects) {
						if (item.object.name == '闪现' || item.object.name == '返回') { //找到第一个不等于空的模型 就是自定义最近的模型
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
						if (item.object.name == "图标1")//如果点击的对象是“图标1”
						{
							this.action.paused = true; //停止旋转	
							if (materialText1.visible)
								materialText1.visible = false;
							else
								materialText1.visible = true;//如果原来不可见，则变得可见，如果原来可见，则变得不可见
						}
						if (item.object.name == "图标2")//如果点击的对象是“图标1”
						{
							this.action.paused = true; //停止旋转	
							if (materialText2.visible)
								materialText2.visible = false;
							else
								materialText2.visible = true;//如果原来不可见，则变得可见，如果原来可见，则变得不可见
						}
						if (item.object.name == "图标3")//如果点击的对象是“图标1”
						{
							this.action.paused = true; //停止旋转	
							if (materialText3.visible)
								materialText3.visible = false;
							else
								materialText3.visible = true;//如果原来不可见，则变得可见，如果原来可见，则变得不可见
						}
						if (item.object.name == "图标4")//如果点击的对象是“图标1”
						{
							this.action.paused = true; //停止旋转	
							if (materialText4.visible)
								materialText4.visible = false;
							else
								materialText4.visible = true;//如果原来不可见，则变得可见，如果原来可见，则变得不可见
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
					img = textureLoader.load(require('../../public/img/sanya.jpg')); //vue加载图表需要用 require形式
					sceneName = 'sanya';//改变场景名
					canvasText = this.getcanvers('返回'); //生成一个canvers 文字图案对象	
					names = '返回';
				} else if (type == 'backtrack') { //返回房间
					img = textureLoader.load(require('../../public/img/jia3.jpeg')); //vue加载图表需要用 require形式
					sceneName = 'jia';//改变场景名	
					canvasText = this.getcanvers('走出'); //生成一个canvers 文字图案对象	
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
		}
	}
</script>