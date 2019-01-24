<template>
    <div class="file-upload-item">
        <Tooltip content="文件上传" placement="bottom">
            <Button type="text" @click="modal = true" ghost size="large" icon="md-attach"></Button>
        </Tooltip>
        <Modal
            v-model="modal"
            title="文件上传">
            <Upload
                multiple
                type="drag"
                :action="fileServer"
                :format="['docx','xlsx','xls','pptx']"
                :on-success="handleSuccess"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击选择Word Excel PPT文件，或者将文件拖入进来</p>
                </div>
            </Upload>
        </Modal>
    </div>
</template>

<script>
    import {api} from '@/api/api'
    import myAjax from '@/ajax/myAjax'
    import mySessionStorage from '@/model/mySessionStorage'
    export default {
        data () {
            return {
                fileServer:api.uploadApi,
                modal: false
            }
        },
        methods: {
            handleSuccess(res){
                if (res.code == 200) {
                    this.$emit('uploadStatus','success');
                    var uploadInfo = {
                        userId : mySessionStorage.get("userInfo").userId,
                        fileId : res.data.fileId,
                        fileName : res.data.fileName
                    }
                    myAjax.post({
                        url:api.uploadStatusApi,
                        data:JSON.stringify(uploadInfo),
                        success:(data)=>{  // 成功
                            if (data.code == 200) {
                                this.$Message.success('文件 ' + res.data.fileName + ' 上传成功！');
                            }else{
                                this.$Message.error('文件 '+ res.data.fileName + ' 上传失败！');
                            }
                        },
                        fail:(err)=>{     // 失败
                            this.$Message.error('文件 '+ res.data.fileName + ' 上传失败！');
                        }
                    })
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件类型错误',
                    desc: '文件' + file.name + ' 类型错误, 请选择word、excel、ppt文件。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小超过限制',
                    desc: '文件  ' + file.name + ' 太大, 请选择其他文件。'
                });
            },
            handleBeforeUpload(file){

            }
        }
    }
</script>

