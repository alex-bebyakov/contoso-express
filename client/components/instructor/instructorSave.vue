<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">{{header}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
                <div class="form-group">
                    <label for="last-name" class="col-xs-3 control-label">Last Name:</label>

                    <div class="col-xs-9">
                        <input type="text" id="last-name" class="form-control"
                               v-model="instructor.lastName" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="first-name" class="col-xs-3 control-label">First Name:</label>

                    <div class="col-xs-9">
                        <input type="text" id="first-name" class="form-control"
                               v-model="instructor.firstName" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label">Hire Date:</label>

                    <div class="col-xs-9">
                        <datepicker :value.sync="instructor.hireDate" :disabled-days-of-Week="disabled" :format="dd/MM/yyyy"
                                    :show-reset-button="reset">
                        </datepicker>
                    </div>
                </div>

                <div class="form-group">
                    <label for="office-location" class="col-xs-3 control-label">Office Location:</label>

                    <div class="col-xs-9">
                        <input type="text" id="office-location" class="form-control"
                               v-model="instructor.officeAssignment.location" />
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-4" v-for="course in allCourses">
                        <input type="checkbox" :name="course.value" :value="course.value" v-model="selectedCourses" />

                        <label :for="course.value">{{course.text}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="doAction" class="btn btn-default">Save</button>
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="awesome-typescript" src="./instructorSave.vue.ts"></script>