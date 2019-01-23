<template>
    <div class="file-upload-item">
        <Tooltip content="文件上传" placement="bottom">
            <Button type="text" @click="modal = true" ghost size="large" icon="md-attach"></Button>
        </Tooltip>
        <Modal
            v-model="modal"
            title="文件上传"
            @on-ok="ok"
            @on-cancel="cancel">
            <Upload
                multiple
                type="drag"
                :action="fileServer">
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
    export default {
        data () {
            return {
                fileServer:api.uploadApi,
                modal: false
            }
        },
        methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>

