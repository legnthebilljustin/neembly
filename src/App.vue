<template>
	<v-app>
		<v-main>
			<div class="app-container">
				<AddProductForm  @addProduct="addProduct" />
				
				<div v-if="!isFetchingProducts && products.length > 0">
					<div class="mt-3">
						<v-text-field label="Search Product"
							placeholder="Search product title..."
							variant="underlined"
							v-model="searchQuery"
						/>
					</div>
					<ProductsList :products="filteredProducts" />
				</div>
				<div v-if="isFetchingProducts" class="ma-5">
					Fetching products...
				</div>
			</div>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import "./assets/app.css"
import eventBus from "./eventBus";
import { ProductsList, AddProductForm } from './components';
import axios from 'axios';
import { Product } from './types';
import { computed, onMounted, ref } from 'vue';
import { EMIT_DELETE_PRODUCT, EMIT_UPDATE_PRODUCT } from "./constants/keys";

const products = ref<Product[]>([])
const isFetchingProducts = ref<boolean>(false)
const error = ref<string | null>(null)

const searchQuery = ref<string>("")

const addProduct = (newProduct: Product) => {
	console.log("new prod", newProduct)
	products.value.push(newProduct)
}

const filteredProducts = computed(() => {
	if (searchQuery.value === "") {
		return products.value
	}

	return products.value.filter(product =>
		product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

const fetchProducts = async () => {
    isFetchingProducts.value = true

    try {
        const response = await axios.get("https://fakestoreapi.com/products")
        products.value = response.data
    } catch (err) {
        error.value = "Failed to fetch products."
    } finally {
        isFetchingProducts.value = false
    }
}

const updateProduct = (updatedProduct: Product) => {
	const index = products.value.findIndex(product => product.id === updatedProduct.id)
	if (index !== -1) {
		products.value.splice(index, 1, updatedProduct)
	}
}

const deleteProduct = (productId: number) => {
	products.value = products.value.filter(product => product.id !== productId)
}

onMounted(() => {
	fetchProducts()

	eventBus.on(EMIT_UPDATE_PRODUCT, (product: Product) => {
		updateProduct(product)
	})

	eventBus.on(EMIT_DELETE_PRODUCT, (productId: number) => {
		deleteProduct(productId)
	})
})

</script>