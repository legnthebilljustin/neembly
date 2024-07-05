<template>
    <div>
        <v-btn @click="dialog = true"
            density="compact"
            color="primary"
        >
            Edit Product
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <form @submit.prevent="handleSubmit">
                <v-card title="Add new product">
                <v-card-text>
                    <v-text-field
                        density="compact"
                        label="Title"
                        variant="outlined"
                        style="margin-bottom: -10px;"
                        v-model="formData.title"
                    />
                    <v-text-field
                        density="compact"
                        label="Category"
                        variant="outlined"
                        style="margin-bottom: -10px;"
                        v-model="formData.category"
                    />
                    <v-text-field type="number"
                        density="compact"
                        label="Price"
                        variant="outlined"
                        style="margin-bottom: -10px;"
                        v-model="formData.price"
                    />
                    <v-text-field
                        density="compact"
                        label="Image"
                        variant="outlined"
                        style="margin-bottom: -10px;"
                        v-model="formData.image"
                    />
                    <v-textarea
                        density="compact"
                        label="Description"
                        variant="outlined"
                        style="margin-bottom: -10px;"
                        v-model="formData.description"
                    />
                </v-card-text>
                <v-card-actions class="d-flex justify-between">
                    <v-btn :disabled="disableButtons" @click="dialog = false">Close</v-btn>
                    <v-btn color="error" :disabled="disableButtons" @click="handleDelete">Delete</v-btn>
                    <v-btn type="submit" color="success" :disabled="disableButtons">Update</v-btn>
                </v-card-actions>
                </v-card>
            </form>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/types';
import { reactive, ref } from 'vue';
import axios from 'axios';
import eventBus from '@/eventBus';
import { EMIT_DELETE_PRODUCT, EMIT_UPDATE_PRODUCT } from '@/constants/keys';

const dialog = ref<boolean>(false)
const props = defineProps<{ product: Product }>()
const disableButtons = ref(false)

const formData = reactive<Product>({ ...props.product})

const handleDelete = () => {
    disableButtons.value = true
    if (window.confirm("Are you sure you want to delete this product?")) {
        axios.delete(`https://fakestoreapi.com/products/${formData.id}`)
            .then(res => {
                eventBus.emit(EMIT_DELETE_PRODUCT, res.data.id)
                dialog.value = false
            })
            .catch(err => alert("Failed to delete product."))
            .finally(() => disableButtons.value = false)
    }
    
}

const handleSubmit = () => {
    disableButtons.value = true
    axios.put(`https://fakestoreapi.com/products/${formData.id}`)
        .then(() => {
            eventBus.emit(EMIT_UPDATE_PRODUCT, formData)
            dialog.value = false
        })
        .catch(() => alert("Failed to update product."))
        .finally(() => disableButtons.value = false)
}

</script>