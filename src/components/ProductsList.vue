<template>
    <div v-if="products && products.length > 0">
        <ProductCard v-for="product in products"
            :key="product.id"
            :product="product" 
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Product } from "@/types";
import ProductCard from "./ProductCard.vue";

defineProps<{ products: Product[] }>();

</script>