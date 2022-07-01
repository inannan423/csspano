<template>
    <div class="main" style="background-color:transparent">
        <div class="midbox">
            <img src="../assets/lif.png" class="lif" alt="lif">
            <!-- <iframe src="./lion.html" frameborder="0"></iframe> -->
            <!-- <iframe allowTransparency="true" src='https://my.spline.design/untitled-4a3c8c8d0f7d860d9382fa7f1c707301/'
                frameborder='0' width='100%' height='100%'></iframe> -->
            <!-- <iframe src='https://my.spline.design/untitled-6c4ccd115ef51f87725ebe3625871b31/' frameborder='0'
                width='1000px' height='100%'></iframe> -->
            <div class="btn">
                <p>UPLOAD</p>
            </div>
        </div>
        <img class="btnpic" src="../assets/upl.png" alt="upload">
    </div>
</template>
<style scoped>
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
<script>
    export default {
        name: 'Home',
        data() {
            return {
                day: 100,
                msg: 'Welcome to Your Vue.js App',
                welcome: '👋你好！欢迎来到 OrangeUniverse 。来自热爱前端设计和开发的数媒程序猿一只(</>)。本网站使用Vue.js脚手架和及其官方UI框架（饿了么团队开发的element UI）进行开发，虽然本站貌似实现了数据与页面的分离，但是并没有实际作用，这还是一个静态网站（后端知识为0！！）。本网站中的部分文档采用嵌入pdf实现，既减少开发维护成本，也更加灵活。不过我很嫌弃那个iframe嵌入框样式，目前不开放修改其样式！但没办法，Mozilla的pdf.js框架只能弹窗使用，vue-pdf不能复制。未来本站将陆续实现文档上传、富文本编写等功能，但那不知道是猴年马月了。',
                aboutlinon: '这是一只来自codepen的狮子，使用Three.js编程实现。按住鼠标左键即可打开电风扇，让狮子凉爽一下！其采用iframe插入到了html网页中。作者： <el-link type="primary">https://codepen.io/Yakudoo/pen/YXxmYR</el-link>',
                searchCriteria: '',
                breadcrumbItems: ['首页']
            }
        },
        methods: {
        },
        mouted() {
        }
    }
</script>