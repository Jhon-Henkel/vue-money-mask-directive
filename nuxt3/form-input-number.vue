<script setup lang="ts">
import {computed} from 'vue'
import {useTheme} from "~/composables/theme/use.theme";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [Number, null],
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
    fractionDigits: {
        type: Number,
        default: 0,
    }
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void
}>()

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

const {currentTheme} = useTheme()
const step = props.fractionDigits === 0 ? 1 : 0.01
const optionsFormat = {prefix: '', suffix: '', thousands: '.', decimal: ',', precision: props.fractionDigits}
</script>

<template>
    <UFormField :name="name" :label="label" :required="required" :description="description">
        <UInputNumber
            v-money="optionsFormat"
            v-model="model"
            :placeholder="placeholder"
            :class="[cssClass]"
            :color="currentTheme.primaryColorRoot"
            :disabled="disabled"
            :disable-wheel-change="true"
            :min="0"
            :step="step"
        />
    </UFormField>
</template>
