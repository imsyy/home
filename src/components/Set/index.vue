<template>
    <div class="setting">
        <el-collapse class="collapse" v-model="activeName" accordion>
            <el-collapse-item title="壁纸设置" name="1">
                <div class="bg-set">
                    <el-radio-group v-model="bgSet" text-color="#ffffff">
                        <el-radio label="0" size="large" border>默认壁纸</el-radio>
                        <el-radio label="1" size="large" border>每日一图</el-radio>
                        <el-radio label="2" size="large" border>随机风景</el-radio>
                        <el-radio label="3" size="large" border>随机动漫</el-radio>
                    </el-radio-group>
                </div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
                <div>
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
                <div>
                    Simplify the process: keep operating process simple and intuitive;
                </div>
                <div>
                    Definite and clear: enunciate your intentions clearly so that the
                    users can quickly understand and make decisions;
                </div>
                <div>
                    Easy to identify: the interface should be straightforward, which helps
                    the users to identify and frees them from memorizing and recalling.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
                <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                </div>
                <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { mainStore } from "@/store";
const store = mainStore();

// 默认选中项
let activeName = ref('1');
let bgSet = ref("0");

onMounted(() => {
    bgSet.value = store.coverType.toString();
})

// 壁纸选中项
watch(
    () => bgSet.value,
    (value) => {
        store.coverType = value;
    }
);
</script>

<style lang="scss" scoped>
.setting {
    .collapse {
        border-radius: 8px;
        --el-collapse-content-bg-color: #ffffff10;
        border-color: transparent;
        overflow: hidden;

        :deep(.el-collapse-item__header) {
            background-color: #ffffff30;
            color: #fff;
            font-size: 15px;
            padding-left: 18px;
            border-color: transparent;
        }

        :deep(.el-collapse-item__wrap) {
            border-color: transparent;

            .el-collapse-item__content {
                padding: 20px;

                .bg-set {
                    .el-radio-group {
                        justify-content: center;


                        .el-radio {
                            margin: 10px 16px;

                            .el-radio__label {
                                color: #fff;
                            }

                            .el-radio__inner {
                                background-color: #ffffff60 !important;
                                border-color: #fff !important;
                            }

                            &.is-checked {
                                background-color: #ffffff60;
                                border-color: #ffffff80;
                            }

                            .is-checked {
                                .el-radio__inner {
                                    background-color: #ffffff30 !important;
                                    border-color: #fff !important;
                                }

                                &+.el-radio__label {
                                    color: #fff !important;
                                }
                            }



                        }
                    }
                }
            }

        }
    }
}
</style>