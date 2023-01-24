<template>
    <svg :class="['icon', `icon-${name}`]" :style="{ width: size, height: size }" xmlns="http://www.w3.org/2000/svg">
      <use :href="`#icon-${name}`" />
    </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: { type: String, required: true },
    size: { type: Number, default: () => 20 }
  }
}
</script>
