<template>
    <div class="dashboard">
        <Card/>
    </div>
</template>

<script>
import Card from '@/components/layout/Card'

export default {
    components: {
        Card,
    },
}
</script>

<style lang="scss" scoped>
    .dashboard {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #F8F8FA;
    }

</style>