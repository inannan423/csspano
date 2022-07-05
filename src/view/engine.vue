<template>
    <div class="main">
        <div class="tip">
            <h2>
                关于项目
            </h2>
            <p>本项目基于vue2、threejs构建.three.js是当前流行的3D JavaScript库,提供了构建3D场景的能力.
                另外,使用了elementUI作为组件库,提升了页面美感和开发效率.如果你喜欢这个项目,请进入
                <a href="https://github.com/inannan423/csspano" target="_blank">这个仓库</a> 给我们一个Star!非常感谢.
            </p>
            <p><a href="https://jetzihan.netlify.app/pages/a23dcc/">文档地址</a></p>
            <p>contributor: <a href="https://jetzihan.netlify.app/" target="_blank">Jetzihan</a> |
                <a href="https://github.com/Stutuer" target="_blank">Stutuer</a> |
                <a href="https://github.com/songyifan1" target="_blank">songyifan</a>
            </p>
            <p>MIT LICENSE</p>
        </div>
        <div class="version">
            <h2>技术栈</h2>
            <img src="../assets/tech.png" alt="tech" class="tech">
        </div>

        <div class="version1">
            <h2>网页托管和CDN加速</h2>
            <img src="../assets/net.png" alt="tech" class="tech2">
        </div>
    </div>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: orange;
    }

    .version {
        width: 87%;
        height: 30px;
        justify-content: center;
        text-align: center;
        align-items: center;
    }

    .version1 {
        width: 87%;
        height: 30px;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin-top: 300px;
    }

    .tech {
        width: 87%;
    }

    .tech2 {
        width: 50%;
        margin-top: 60px;
    }
</style>