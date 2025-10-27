import { useState } from "react";
import { Box, Image, Text, Button, Flex, Stack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const images = [
  { src: "/img/banner.avif", label: "Bed Room", items: "1200+ item" },
  { src: "/img/banner2.avif", label: "Living Room", items: "900+ item" },
  { src: "/img/banner3.avif", label: "Waiting Room", items: "500+ item" }
];

const MotionBox = motion(Box);

export const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Flex direction="column" align="center" justify="center" w="full" h={{base: "992px" , md:"100vh"}} bg="teal.900" color="white" p={10}>
      {/* Texto principal */}
      <Stack spacing={4} textAlign="center" mb={10}>
        <Text fontSize="sm" bg="gray.700" mt={{base:"40px" , md:"10px"}} px={3} py={1} rounded="full">Diseños sofisticados</Text>
        <Heading fontSize="5xl">Modernos diseños de interiores</Heading>
        <Text fontSize="lg" opacity={0.8}>
          Elige los muebles adecuados para tu hogar, añadirá elegancia y funcionalidad a tu interior.
        </Text>
        <Flex gap={4} justify="center">
          <Button colorScheme="yellow">
            <Link to="/Products">Comprar</Link>
          </Button>
          <Button variant="link" color="whiteAlpha.900">
            <Link to="/About">Sobre Nosotros</Link>
          </Button>
        </Flex>
      </Stack>

      {/* Imagen principal con animación */}
      <MotionBox
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        position="relative"
      >
        <Image src={images[index].src} alt={images[index].label} rounded="lg" boxShadow="lg" w="500px" h="300px" />
        <Text position="absolute" bottom={4} left={4} bg="blackAlpha.600" p={2} rounded="md">
          {images[index].label} - {images[index].items}
        </Text>
      </MotionBox>

      {/* Botones de navegación */}
      <Flex mt={4} gap={4}>
        <Button onClick={handlePrev} leftIcon={<ChevronLeftIcon />} color="white" colorScheme="gray" variant="outline">
          Atrás
        </Button>
        <Button onClick={handleNext} rightIcon={<ChevronRightIcon />} colorScheme="yellow">
          Siguiente
        </Button>
      </Flex>
    </Flex>
  );
}

