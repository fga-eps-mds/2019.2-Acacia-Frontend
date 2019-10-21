<template>
    <div id="autocomplete" class="selectfield-container">

        <div class="row ml-1 mr-1 centralize-div">
            <!-- DIV for displaying the label on the screen -->
            <div 
            v-if="label" 
            :class="'col-12 p-0 textfield-label' + color" 
            style="8B8888">
              {{ label }}
            </div>

            <input 
            type="text"
            @focus="toggleVisible" 
            @keydown.up="up"
            @keydown.down="down"
            @keydown.enter="selectItem"
            :placeholder="placeholder">    

            <div class="popover" v-show="visible">
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
    </div>
</template>

<script>
export default {
    props: {
        label: {
            default: "",
            type: String,
        },

        placeholder: {
            default: "",
            type: String,
        },

        items: {
            default: [],
            type: Array,
        },
     
        filterby: {
            default: "",
            type: String,
        },

        color: {
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
                return this.items;
            }

            return this.items.filter( (item) => item[this.filterby].toLowerCase().includes(this.query.toLowerCase()) );
        },


    },
}
</script>


<style lang="scss" scoped>
    .selectfield-container {
        width: 100%;
        padding-right: 20px;
        padding-left: 20px;
        margin-right: auto;
        margin-right: auto;    
    }

    .popover {
        align-content: center;
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

    input {
        color: #8B8888;
    }
    /* Hidden placeholder when focus */
    input.white::-webkit-input-placeholder {
      color: #ffffff;
    }
    input.black::-webkit-input-placeholder {
      color: #000000;
    }
    input:focus::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0);
    }

</style>
