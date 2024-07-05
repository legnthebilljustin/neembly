<template>
    <div>
        <v-btn color="indigo-darken-3"
            @click="dialog = true"
        >Add Product</v-btn>
        <v-dialog v-model="dialog" width="400">
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
                <v-card-actions>
                    <v-btn color="error" :disabled="disableButtons" @click="dialog = false">Close</v-btn>
                    <v-btn type="submit" color="success" :disabled="disableButtons">Add Product</v-btn>
                </v-card-actions>
            </v-card>
            </form>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';

const emit = defineEmits(['addProduct'])

type ProductFormData = {
    id?: number
    category: string
    description: string
    image: string
    price: number
    title: string
}

const dialog = ref(false)
const disableButtons = ref(false)

const formData = reactive<ProductFormData>({
    title: "",
    category: "",
    price: 0,
    description: "",
    image: ""
})

const handleSubmit = () => {
    disableButtons.value = true
    axios.post("https://fakestoreapi.com/products", JSON.stringify(formData))
        .then(res => {
            // adding received `id` since no data is being stored in the db
            const newProduct = { ...formData}
            newProduct.id = res.data.id
            dialog.value = false
            emit('addProduct', newProduct)
        })
        .catch(err => alert("Failed to add a new product."))
        .finally(() => disableButtons.value = false)
    
}


</script>