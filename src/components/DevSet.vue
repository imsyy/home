<template>
    <div class="devsettings">
        <div>都说了没什么神秘的啦~..待开发..</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.devsettings {
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

                .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;

                    .el-switch__core {
                        border-color: transparent;
                        background-color: #ffffff30;
                    }

                    .el-button {
                        border-color: transparent;
                        background-color: #ffffff30;
                    }

                    .el-radio-group {
                        .el-radio {
                            margin: 2px 10px 2px 0;
                            border-radius: 5px;

                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                }

                .el-radio-group {
                    justify-content: space-between;

                    .el-radio {
                        margin: 10px 16px;
                        background: #ffffff26;
                        border: 2px solid transparent;
                        border-radius: 8px;

                        .el-radio__label {
                            color: #fff;
                        }

                        .el-radio__inner {
                            background: #ffffff06 !important;
                            border: 2px solid #eeeeee !important;
                        }

                        &.is-checked {
                            background: #ffffff06 !important;
                            border: 2px solid #eeeeee !important;
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
</style>