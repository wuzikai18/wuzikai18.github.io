export const getBase64Image = (img) => {
    const myPromise = new Promise((resolve, reject) => {
        img.onload = () => { // onload 为异步事件
            var canvas = document.createElement("canvas");
            var width = img.naturalWidth || img.width;
            var height = img.naturalHeight || img.height;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height); // 绘制图像
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase(); // 图片格式
            var dataURL = canvas.toDataURL("image/" + ext); // 包含图片展示的 data URI
            if (dataURL) {
                resolve(dataURL);
            } else {
                reject("参数错误,请传入一个img")
            }

        }

    })
console.log(myPromise)
    return myPromise;
}