<template>
    <v-card class="my-2" elevation="3" density="compact">
        <v-card-item>
            <v-card-title class="product-title">{{ product.title }}</v-card-title>
        </v-card-item>
        <v-card-text>
            
            <div class="description">
                {{ product?.description && product.description !== "" ? product.description : "No description provided." }}
            </div>
            <div v-if="product?.rating" class="rating mt-3">
            <span>{{ product.rating?.rate ? product.rating.rate : 0 }}</span> 
            from {{ product.rating?.count ? product.rating.count : 0 }} reviews</div>
        </v-card-text>
        <v-card-actions class="d-flex justify-between">
            <div class="price"> Php {{ product.price }} </div>
            <EditProductForm :product="product" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { Product } from '@/types';
import { EditProductForm } from '.';

defineProps<{ product: Product }>()
</script>

<style lang="scss" scoped>
.product-title {
    font-size: 1rem;
    color: #484848;
}

.description {
    display: block;
    color: #525252;
}

.rating {
    font-size: 0.75rem;
    font-weight: bold;
    margin-right: 30px;

    span {
        color: #06b603;
    }
}

.price {
    margin-left: 0.5rem;
    margin-right: auto;
    font-size: 0.85rem;
    font-weight: bold;
}
</style>