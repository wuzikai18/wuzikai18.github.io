<template>
  <el-upload
  ref="upload"
	action 
	:on-change="onChange"
	:limit="1"
  class="avatar-uploader"
  >
  <div v-if="!imageUrl" class="choose-image-btn" >
        <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
    </div>
    <el-image v-else :src="imageUrl" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
  </el-upload>
</template>
<script setup>
import {ref} from 'vue'
import {updateImage} from '~/graphql/getImage'
import  CryptoJS from 'crypto-js'

defineProps({
    data:Object,
    status:String
})
const emit = defineEmits(["success","insert","create"])


const uploadUrl = ref('');
const contentType = ref('')
const md5 = ref('')
const typeName = ref()
const image_id = ref(null)
const imageUrl = ref('')
const url = ref('')
const onChange = (file)=>{
    typeName.value = file.name.split('.').pop().toLowerCase();
			var image = new Image();
			image.src = file.url;
			uploadUrl.value = image;
      contentType.value = file.raw.type
      md5Base64(file.raw).then((res)=>{
        md5.value = res
        updateImage(res,typeName.value.toUpperCase()).then((res)=>{
              image_id.value = res.data.imagePresignedUrl.imageId;
              url.value = res.data.imagePresignedUrl.downloadUrl;
          var myHeaders = new Headers();
              myHeaders.append("content-md5", md5.value);
              myHeaders.append("Content-Type", contentType.value);
              var requestOptions = {
             headers: myHeaders,
             method: 'PUT',
             body: file.raw
          };
              fetch(res.data.imagePresignedUrl.uploadUrl, requestOptions).then(()=>{
                imageUrl.value = url.value
                emit('success')
                if(status=='create'){
                  emit('create',image_id.value)
                }else{
                  emit('insert',image_id.value)
                }
                
              }).catch((err)=>{
              })
            })
        
      })
}
    const md5Base64=(file)=>{
      return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e?.target?.result) {
        const wordArray = CryptoJS.lib.WordArray.create(e?.target?.result);
        const hash = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
        resolve(hash);
      } else {
        reject('');
      }
    };
    reader.onerror = () => {
      reject('');
    };
    reader.readAsArrayBuffer(file);
  });
    }
</script>
<style>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
.choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}</style>