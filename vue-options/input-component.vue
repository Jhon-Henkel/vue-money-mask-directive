<template>
    <div class="row" :class="customClassRow">
        <div :class="customClassCol">
            <div class="input-group mb-3" :class="customClassForm" v-if="useFloatingLabels">
                <span class="input-group-text input-background-icon">
                    <font-awesome-icon :icon="['fas', 'brazilian-real-sign']" />
                </span>
                <div class="form-floating">
                    <input class="form-control v-money"
                           id="input-money"
                           placeholder=""
                           v-money="{precision, decimal, thousands, prefix, suffix}"
                           @change="change"
                           :value="formattedValue"
                           type="tel"
                           required>
                    <label for="input-money">{{ title }}</label>
                </div>
            </div>
            <div class="form-group" :class="customClassForm" v-else>
                <label class="form-label" for="input-money" v-show="showTitle">
                    {{ title }}
                </label>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                        <font-awesome-icon :icon="['fas', 'brazilian-real-sign']" />
                    </span>
                    <input class="form-control v-money"
                           id="input-money"
                           v-money="{precision, decimal, thousands, prefix, suffix}"
                           @change="change"
                           :value="formattedValue"
                           type="tel"
                           required>
                </div>
            </div>
        </div>
    </div>

    <!--
    Example of use (this example component use bootstrap classes and fontawesome icons):
    <input-component :value="expense.value" title="Valor Parcela" @input-money="amount = $event" :use-floating-labels="true"/>
    -->
</template>

<script>
import money from '/directive/moneyMask'
import defaults from '/directive/options'
import { format, unformat } from '/directive/util'

export default {
    name: 'inputMoney',
    emits: [
        'input-money'
    ],
    props: {
        customClassCol: {
            type: String,
            default: 'col-4'
        },
        customClassRow: {
            type: String,
            default: 'justify-content-center'
        },
        customClassForm: {
            type: String,
            default: 'mt-2'
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: 'Valor'
        },
        value: {
            required: true,
            type: [Number, String],
            default: 0
        },
        masked: {
            type: Boolean,
            default: false
        },
        precision: {
            type: Number,
            default: () => defaults.precision
        },
        decimal: {
            type: String,
            default: () => defaults.decimal
        },
        thousands: {
            type: String,
            default: () => defaults.thousands
        },
        prefix: {
            type: String,
            default: () => defaults.prefix
        },
        suffix: {
            type: String,
            default: () => defaults.suffix
        },
        useFloatingLabels: {
            type: Boolean,
            default: false
        }
    },
    directives: {
        money
    },
    data() {
        return {
            formattedValue: ''
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue, oldValue) {
                const formatted = format(newValue, this.$props)
                if (formatted !== this.formattedValue) {
                    this.formattedValue = formatted
                }
            }
        }
    },
    methods: {
        change(event) {
            this.$emit(
                'input-money',
                this.masked ? event.target.value : unformat(event.target.value, this.precision)
            )
        }
    }
}
</script>

<style scoped>
.input-background-icon {
    border: 0;
    background-color: #cffff3;
}
</style>