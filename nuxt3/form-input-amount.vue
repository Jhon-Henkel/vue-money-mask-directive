<script setup lang="ts">
import { computed } from 'vue'
import {useTheme} from "~/composables/theme/use.theme";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    cssClass: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: '',
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

const onWheel = (event: WheelEvent) => {
    (event.target as HTMLElement).blur();
};

const { currentTheme } = useTheme()
</script>

<template>
    <UFormField :name="name" :label="label" :required="required" :description="description">
        <UInputNumber
            v-money="{prefix: '', suffix: '', thousands: '.', decimal: ',', precision: 2}"
            v-model="model"
            :placeholder="placeholder"
            :class="[cssClass]"
            :color="currentTheme.primaryColorRoot"
            :disabled="disabled"
            :step="0.01"
            :min="0"
            orientation="vertical"
            @wheel.prevent="onWheel"
        />
    </UFormField>
</template>
