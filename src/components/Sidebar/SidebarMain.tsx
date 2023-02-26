import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

interface SidebarProps {
    children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const { isOpen, onToggle } = useDisclosure();
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

    return (
        <>
            {!isLargerThan768 &&
                <Box
                    as="nav"
                    pos="fixed"
                    top="0"
                    left="0"
                    bg="gray.100"
                    w="100%"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex="100"
                >
                    <Box>
                        <IconButton
                            aria-label="Toggle sidebar"
                            icon={<HamburgerIcon />}
                            onClick={onToggle}
                            size="md"
                            variant="ghost"
                            color="gray.500"
                            _hover={{ color: 'gray.600' }}
                        />
                    </Box>
                </Box>
            }
            <Drawer
                isOpen={isOpen && !isLargerThan768}
                placement="left"
                onClose={onToggle}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Product Filter</DrawerHeader>
                    <DrawerBody>{children}</DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box
                as="aside"
              
                bg="gray.100"
                p={4}
                position={{ base: 'fixed', lg: 'relative' }}
                top={{ base: 0, lg: 'auto' }}
                left={{ base: 0, lg: 'auto' }}
                height={{ base: 'auto', lg: '100vh' }}
                overflowY={{ base: 'visible', lg: 'auto' }}
                ml={{ base: '-100%', lg: 0 }}
                mt={{ base: '60px', lg: 0 }}
                transition="all 0.2s ease-out"
                transform={{ base: isOpen ? 'translateX(100%)' : 'translateX(0)', lg: 'translateX(0)' }}
                zIndex="90"
            >
                {isLargerThan768 && <>{children}</>}
            </Box>
        </>
    );
};