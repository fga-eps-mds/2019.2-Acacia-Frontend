<template>
    <div id="autocomplete" class="selectfield">
        <div class="input" @click="toggleVisible" v-text="selectedItem ? selectedItem[filterby] : ''"></div>
        <div class="popover" v-show="visible">
            <input 
            type="text"
            v-model="query"
            @keydown.up="up"
            @keydown.down="down"
            @keydown.enter="selectItem"
            placeholder="Start typing ...">
            <div class="options" ref="optionList">
                <ul>
                    <li
                        v-for="(match, index) in matches"
                        :key="match[index]"
                        :class="{ 'selected': (selected == index)}"
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
    props: {
        items: {
            default: [],
            type: Array,
        },
     
        filterby: {
            default: "",
            type: String,
        },

        title: {
            default: "",
            type: String,
        },

    },

    data() {
        return {
            selectedItem: null,
            selected: 0,        // Index data
            query: '',          // Data to store the input
            visible: false,     // Boolean to set the visibility of the pop-over
        };
    },

    methods: {
        toggleVisible() {            
            this.visible = !this.visible;
        },

        itemClicked(index) {
            this.selected = index;
            this.selectItem();        
        },

        selectItem() {
            this.selectedItem = this.matches[this.selected]
            this.visible = false;
        },

        up() {
            if (this.selected == 0) return

            this.selected -= 1;
            this.scrollToItem()
        },

        down() {
            if (this.selected >= this.matches.length-1) return

            this.selected += 1;
            this.scrollToItem()
        },

        scrollToItem() {
            this.$refs.optionList.scrollTop = this.selected * 41
        }
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
        padding-left: 10px;
        padding-top: 10px;
        cursor: text;
    }

    .popover {
        min-height: 50px;
        border: 2px solid;
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
        background: #ffffff;
        border-radius: 3px;
        text-align: center;
    }

    .popover input {
        width: 95%;
        margin-top: 5px;
        height: 40px;
        font-size: 16px;
        border-radius: 3px;
        border: 1 px solid lightgray;
        padding-left: 8px;
    }

    .options {
        max-height: 150px;
        overflow-y: scroll;
        margin-top: 5px;
    }

    .options ul {
        list-style-type: none;
        text-align: left;
        padding-left: 0;
    }

    .options ul li {
        border-bottom: 1px solid lightgray;
        padding: 10px;
        cursor: pointer;
        background: #f1f1f1;
    }

    .options ul li.selected{
        background: #58bd4c;
        color: #ffffff;
        font-weight: 600;
    }

</style>