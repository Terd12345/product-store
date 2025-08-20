import { Box, Input, useColorModeValue, Button } from "@chakra-ui/react";
import { Image, Heading, Text, HStack, IconButton, useToast, useDisclosure, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product"; 
import { useState } from "react";

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "whiteAlpha.900");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid)

        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async(pid, updatedProductData) => {
        await updateProduct(pid, updatedProductData);
        onClose();
    }

    return (
        <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
            </HStack>

        </Box>


        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={4}>
                        
                        <Input
                        placeholder="Product Name"
                        name="name"
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        value={updatedProduct.name}
                        />

                        <Input
                        placeholder="Product Price"
                        name="price"
                        type="number"
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        value={updatedProduct.price}
                        />

                        <Input
                        placeholder="Product Image"
                        name="image"
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        value={updatedProduct.image}
                        />


                        </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                    <Button colorScheme="red" onClick={onClose}>Cancel</Button>
                </ModalFooter>

            </ModalContent>

        </Modal>


        </Box>
    )
}

export default ProductCard; 