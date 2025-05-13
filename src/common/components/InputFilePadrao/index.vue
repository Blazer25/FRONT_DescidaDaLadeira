<template>
  <div class="file-upload-wrapper">
    <input
      :key="resetKey"
      type="file"
      class="file-upload-input"
      @change="onFileChange"
      :id="inputId"
    />
    <label :for="inputId" class="file-upload-label">
      {{ labelText }}
    </label>
    <span class="file-upload-filename" v-if="fileName">{{ fileName }}</span>
  </div>
</template>

<script>
export default {
  name: "InputFilePadrao",
  props: {
    labelText: {
      type: String,
      default: "Escolher arquivo",
    },
    inputId: {
      type: String,
      default: "input-file-padrao",
    },
    resetKey: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      fileName: "",
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.fileName = file ? file.name : "";
      this.$emit("fileSelected", file);
    },
  },
  watch: {
    resetKey() {
      this.fileName = "";
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />