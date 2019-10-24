<template>
    <div class="container-date-picker">
        <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="today"
            persistent
            width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="today"
                    :label="labelDate"
                    readonly
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="today" color="blue" :min="today" class="date-picker" scrollable>
                <v-spacer></v-spacer>
                <v-btn color="blue" class="date-picker-button" @click="modal = false">Cancel</v-btn>
                <v-btn color="blue" class="date-picker-button" @click="$refs.dialog.save(date)">Confirm</v-btn>
            </v-date-picker>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            labelDate: '',
        },
        data: () => ({
            today: new Date().toISOString().slice(0,10),
            modal: false,
        }),
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/colors.scss";

    .date-picker-button {
        margin: 0px 5px 5px 0px;
        font-size: 12px;
        color: white;
        padding: 0px 12px !important;
        border-radius: 10px !important;
        background-color: $color-primary;
    }

    .date-picker {
        border-radius: 12px !important;
    }

    .container-date-picker {
        padding: 0px 20px;
        margin: 1%;
    }

</style>