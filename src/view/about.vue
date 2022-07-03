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
