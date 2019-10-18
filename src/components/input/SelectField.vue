<template>
    <div id="autocomplete" class="selectfield">
        <div class="input" @click="toggleVisible"></div>
        <div class="popover" v-show="visible">
            <input 
            type="text"
            v-model="query"
            placeholder="Start typing ...">
            <div class="options">
                <ul>
                    <li
                        v-for="match in matches"
                        :key="match[filterby]"
                        @click="itemClicked(index)"
                        v-text="match[filterby]">
                    </li>
                </ul>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items', 'filterby'],

    data() {
        return {
            query: '',      // Data to store the input
            visible: false, // Boolean to set the visibility of the pop-over
        };
    },

    methods: {
        toggleVisible() {
            this.visible = !this.visible;
        },

        itemClicked(index){
            console.log(this.matches[index]);
        },
    },

    computed: {
        /****************************************************************************
        | Computed data to return the elements in 'items' that includes query model |
        ****************************************************************************/
        matches() {
            if (this.query == '') {
                return [];
            }

            return this.items.filter( (item) => item[this.filterby].toLowerCase().includes(this.query.toLowerCase()) );
        },
    },
}
</script>


<style lang="scss" scoped>
    .selectfield {
        width: 100%;
        position: relative;
    }

    .input {
        height: 40px;
        border-radius: 3px;
        border: 2px solid lightgray;
        box-shadow: 0 0 10px #eceaea;
        font-size: 25px;
        padding-left: 100px;
        padding-top: 10px;
        cursor: text;
    }

</style>