<template>
  <div 
    class="row p-2"
    style="margin-right:0px"
  >
    <div class="col-3 icon-content">
      <img 
        style="width:70px; height:70px;" 
        class="rounded-circle" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Clarence_Burgin_House_Quincy_MA_01.jpg/1200px-Clarence_Burgin_House_Quincy_MA_01.jpg" 
        alt=""
      >
    </div>
    <div 
      class="description-content col-9 roboto-regular text-dark"
      style="text-decoration: none"
    >
      <b>{{ $t('PropertyDigest.address') }}:</b>  
      {{ property.address }}, 
      {{ property.city }} - {{ property.state }}
      <br>
      <b>{{ $t('PropertyDigest.type') }}:</b> {{ $t('PropertyDigest.' + property.type_of_address.toLowerCase() ) }}
      <br>
      <b>{{ $t('PropertyDigest.zipcode') }}:</b> {{ property.BRZipCode }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyDigest",
  props: {
    property: {
      default: function() {
        return {}
      },
      type: Object
    }
  }
}
</script>

<style>
  .description-content {
    text-align: left;
    font-size: 15px;
  }

  .icon-content {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
</style>