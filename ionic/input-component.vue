<script setup lang="ts">
import {IonInput} from "@ionic/vue"
import { unformat } from "/directive/util.js"

const emits = defineEmits(['input-money'])
const inputOptions = {prefix: '', suffix: '', thousands: '.', decimal: ',', precision: 2}

defineProps(
    {
        label: {
            type: String,
            default: 'Valor (R$)',
            required: false
        },
        value: {
            required: true,
            type: [Number, String],
            default: 0
        },
    }
)

function changeValue(event: any) {
    emits('input-money', unformat(event.detail.value, inputOptions.precision))
}
</script>

<template>
    <ion-input
        :value="value"
        type="tel"
        fill="solid"
        :label="label"
        label-placement="floating"
        @ionChange="changeValue"
        v-money="inputOptions"
    />
    <!--
    Example of use:
    <input-component :value="amount" @input-money="amount = $event"/>
    -->
</template>
