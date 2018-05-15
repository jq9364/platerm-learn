<template>
    <div id="other">
       <h2>HTML5 file API加canvas实现图片前端JS压缩并上传</h2>

        <div>
           <!-- <input type="file" @change="getImage"> -->
           <input type="file" @change="getSmallImage" id="file">
        </div>
        <div class="box">
           <img :src="imgSrc" alt="">
        </div>
    </div>
</template>

<script>
/**
 * @file   : other.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:52:58
 */
export default {
    name: 'other',
    data() {
        return {
            imgSrc: '',
            imgBase: ''
        }
    },
    methods: {
        getImage(ev) {
            let file = ev.target.files[0] ? ev.target.files[0] : '';
            // console.log(file);
            let reader = new FileReader();
            let that = this;
            reader.onload = function (file) {
                let imgSrc = file.target.result;
                // console.log(file.target)
                that.imgSrc = imgSrc;
            };
            reader.readAsDataURL(file);
        },
        getSmallImage(ev) {
            let eleFile = document.querySelector('#file');
            // 压缩图片需要的一些元素和对象
            let reader = new FileReader();
            let img = new Image();

            // 选择的文件对象
            let file = null;

            // 缩放图片需要的canvas
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            console.log(img, 444);
            // base64地址图片加载完毕后
            img.onload = function () {
                // 图片原始尺寸
                let originWidth = this.width;
                let originHeight = this.height;
                // 最大尺寸限制
                let maxWidth = 400;
                let maxHeight = 400;
                // 目标尺寸
                let targetWidth = originWidth;
                let targetHeight = originHeight;

                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }

                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                console.log(333);
                // canvas转为blob并上传
                canvas.toBlob(blob => {
                    console.log(blob);
                    // 图片ajax上传
                    let xhr = new XMLHttpRequest();
                    // 文件上传成功
                    xhr.onreadystatechange = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.status);
                            // xhr.responseText就是返回的数据
                        }
                    };
                    // 开始上传
                    xhr.open('POST', 'upload.php', true);
                    xhr.send(blob);
                }, file.type || 'image/png');
            };

            // 文件base64化，以便获知图片原始尺寸
            reader.onload = e => {
                img.src = e.target.result;
            };
            eleFile.addEventListener('change', function (event) {
                file = event.target.files[0];
                // 选择的文件是图片
                if (file.type.indexOf('image') === 0) {
                    reader.readAsDataURL(file);
                }
            });
        }
    }

}
</script>

<style lang="sass">
    #other
        padding: 30px

        .box
            // width: 200px
            // height: 200px
            border: 1px solid #000
            img
                // width: 100%
                // height: 100%
</style>
