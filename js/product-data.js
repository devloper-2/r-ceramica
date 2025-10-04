/* ===== PRODUCT DATA BASED ON ACTUAL IMAGES ===== */

// Product data organized by categories and collections
const productData = {
    // WASH BASINS - Based on images in wash-basin folder
    washBasins: {
        toro: [
            { code: 'M-1001', name: 'TORO M-1001', type: 'Table Top Basin', image: 'images/wash-basin/TORO M-1001.jpg' },
            { code: 'M-1003', name: 'TORO M-1003', type: 'Wall Hung Basin', image: 'images/wash-basin/TORO M-1003.jpg' },
            { code: 'M-1004', name: 'TORO M-1004', type: 'Pedestal Basin', image: 'images/wash-basin/TORO M-1004.jpg' },
            { code: 'M-1005', name: 'TORO M-1005', type: 'Corner Basin', image: 'images/wash-basin/TORO M-1005.jpg' },
            { code: 'M-1006', name: 'TORO M-1006', type: 'Rectangular Basin', image: 'images/wash-basin/TORO M-1006.jpg' },
            { code: 'M-1007', name: 'TORO M-1007', type: 'Round Basin', image: 'images/wash-basin/TORO M-1007.jpg' },
            { code: 'M-1008', name: 'TORO M-1008', type: 'Oval Basin', image: 'images/wash-basin/TORO M-1008.jpg' },
            { code: 'M-1010', name: 'TORO M-1010', type: 'Designer Basin', image: 'images/wash-basin/TORO M-1010.jpg' },
            { code: 'M-1012', name: 'TORO M-1012', type: 'Modern Basin', image: 'images/wash-basin/TORO M-1012.jpg' },
            { code: 'M-1015', name: 'TORO M-1015', type: 'Luxury Basin', image: 'images/wash-basin/TORO M-1015.jpg' },
            { code: 'M-1016', name: 'TORO M-1016', type: 'Premium Basin', image: 'images/wash-basin/TORO M-1016.jpg' },
            { code: 'M-1018', name: 'TORO M-1018', type: 'Artistic Basin', image: 'images/wash-basin/TORO M-1018.jpg' },
            { code: 'M-1022', name: 'TORO M-1022', type: 'Contemporary Basin', image: 'images/wash-basin/TORO M-1022.jpg' },
            { code: 'M-1024', name: 'TORO M-1024', type: 'Elegant Basin', image: 'images/wash-basin/TORO M-1024.jpg' },
            { code: 'M-1025', name: 'TORO M-1025', type: 'Classic Basin', image: 'images/wash-basin/TORO M-1025.jpg' },
            { code: 'M-1026', name: 'TORO M-1026', type: 'Stylish Basin', image: 'images/wash-basin/TORO M-1026.jpg' },
            { code: 'M-1028', name: 'TORO M-1028', type: 'Minimalist Basin', image: 'images/wash-basin/TORO M-1028.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4001', name: 'TORO T-4001', type: 'Basin Tap', image: 'images/wash-basin/TORO T-4001.jpg' },
            { code: 'T-4004', name: 'TORO T-4004', type: 'Mixer Tap', image: 'images/wash-basin/TORO T-4004.jpg' },
            { code: 'T-4005', name: 'TORO T-4005', type: 'Designer Tap', image: 'images/wash-basin/TORO T-4005.jpg' },
            { code: 'T-4006', name: 'TORO T-4006', type: 'Wall Mounted Tap', image: 'images/wash-basin/TORO T-4006.jpg' },
            { code: 'T-4007', name: 'TORO T-4007', type: 'Deck Mounted Tap', image: 'images/wash-basin/TORO T-4007.jpg' },
            { code: 'T-4011', name: 'TORO T-4011', type: 'Single Lever Tap', image: 'images/wash-basin/TORO T-4011.jpg' },
            { code: 'T-4015', name: 'TORO T-4015', type: 'Pillar Tap', image: 'images/wash-basin/TORO T-4015.jpg' },
            { code: 'T-4018', name: 'TORO T-4018', type: 'Sensor Tap', image: 'images/wash-basin/TORO T-4018.jpg' },
            { code: 'T-4020', name: 'TORO T-4020', type: 'Premium Tap', image: 'images/wash-basin/TORO T-4020.jpg' },
            { code: 'T-4021', name: 'TORO T-4021', type: 'Luxury Tap', image: 'images/wash-basin/TORO T-4021.jpg' },
            { code: 'T-4023', name: 'TORO T-4023', type: 'Modern Tap', image: 'images/wash-basin/TORO T-4023.jpg' }
        ],
        aris: [
            { code: 'M-1102', name: 'ARIS M-1102', type: 'Vessel Basin', image: 'images/wash-basin/ARIS M-1102.jpg' },
            { code: 'M-1103', name: 'ARIS M-1103', type: 'Under Counter Basin', image: 'images/wash-basin/ARIS M-1103.jpg' },
            { code: 'M-1105', name: 'ARIS M-1105', type: 'Drop-in Basin', image: 'images/wash-basin/ARIS M-1105.jpg' },
            { code: 'M-1106', name: 'ARIS M-1106', type: 'Semi-Recessed Basin', image: 'images/wash-basin/ARIS M-1106.jpg' },
            { code: 'M-1108', name: 'ARIS M-1108', type: 'Art Basin', image: 'images/wash-basin/ARIS M-1108.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4102', name: 'ARIS T-4102', type: 'Chrome Tap', image: 'images/wash-basin/ARIS T-4102.jpg' },
            { code: 'T-4103', name: 'ARIS T-4103', type: 'Brass Tap', image: 'images/wash-basin/ARIS T-4103.jpg' },
            { code: 'T-4106', name: 'ARIS T-4106', type: 'Antique Tap', image: 'images/wash-basin/ARIS T-4106.jpg' },
            { code: 'T-4109', name: 'ARIS T-4109', type: 'Matt Tap', image: 'images/wash-basin/ARIS T-4109.jpg' },
            { code: 'T-4112', name: 'ARIS T-4112', type: 'Gold Plated Tap', image: 'images/wash-basin/ARIS T-4112.jpg' }
        ],
        beetle: [
            { code: 'M-1301', name: 'BEETLE M-1301', type: 'Compact Basin', image: 'images/wash-basin/BEETLE M-1301.jpg' },
            { code: 'M-1304', name: 'BEETLE M-1304', type: 'Square Basin', image: 'images/wash-basin/BEETLE M-1304.jpg' },
            { code: 'M-1306', name: 'BEETLE M-1306', type: 'Triangular Basin', image: 'images/wash-basin/BEETLE M-1306.jpg' },
            { code: 'M-1307', name: 'BEETLE M-1307', type: 'Hexagonal Basin', image: 'images/wash-basin/BEETLE M-1307.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4303', name: 'BEETLE T-4303', type: 'Geometric Tap', image: 'images/wash-basin/BEETLE T-4303.jpg' },
            { code: 'T-4306', name: 'BEETLE T-4306', type: 'Angular Tap', image: 'images/wash-basin/BEETLE T-4306.jpg' },
            { code: 'T-4309', name: 'BEETLE T-4309', type: 'Curved Tap', image: 'images/wash-basin/BEETLE T-4309.jpg' },
            { code: 'T-4310', name: 'BEETLE T-4310', type: 'Extended Tap', image: 'images/wash-basin/BEETLE T-4310.jpg' },
            { code: 'T-4311', name: 'BEETLE T-4311', type: 'Compact Tap', image: 'images/wash-basin/BEETLE T-4311.jpg' }
        ],
        latra: [
            { code: 'M-1701', name: 'LATRA M-1701', type: 'Designer Basin', image: 'images/wash-basin/LATRA M-1701.jpg' },
            { code: 'M-1703', name: 'LATRA M-1703', type: 'Luxury Basin', image: 'images/wash-basin/LATRA M-1703.jpg' },
            { code: 'M-1704', name: 'LATRA M-1704', type: 'Premium Basin', image: 'images/wash-basin/LATRA M-1704.jpg' },
            { code: 'M-1705', name: 'LATRA M-1705', type: 'Artistic Basin', image: 'images/wash-basin/LATRA M-1705.jpg' },
            { code: 'M-1706', name: 'LATRA M-1706', type: 'Contemporary Basin', image: 'images/wash-basin/LATRA M-1706.jpg' },
            { code: 'M-1707', name: 'LATRA M-1707', type: 'Modern Basin', image: 'images/wash-basin/LATRA M-1707.jpg' },
            { code: 'M-1708', name: 'LATRA M-1708', type: 'Elegant Basin', image: 'images/wash-basin/LATRA M-1708.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4701', name: 'LATRA T-4701', type: 'Designer Tap', image: 'images/wash-basin/LATRA T-4701.jpg' },
            { code: 'T-4711', name: 'LATRA T-4711', type: 'Luxury Tap', image: 'images/wash-basin/LATRA T-4711.jpg' },
            { code: 'T-4712', name: 'LATRA T-4712', type: 'Premium Tap', image: 'images/wash-basin/LATRA T-4712.jpg' },
            { code: 'T-4713', name: 'LATRA T-4713', type: 'Artistic Tap', image: 'images/wash-basin/LATRA T-4713.jpg' },
            { code: 'T-4714', name: 'LATRA T-4714', type: 'Contemporary Tap', image: 'images/wash-basin/LATRA T-4714.jpg' }
        ],
        lava: [
            { code: 'M-1201', name: 'LAVA M-1201', type: 'Volcanic Design Basin', image: 'images/wash-basin/LAVA M-1201.jpg' },
            { code: 'M-1202', name: 'LAVA M-1202', type: 'Textured Basin', image: 'images/wash-basin/LAVA M-1202.jpg' }
        ],
        levis: [
            { code: 'M-1801', name: 'LEVIS M-1801', type: 'Stylish Basin', image: 'images/wash-basin/LEVIS M-1801.jpg' },
            { code: 'M-1802', name: 'LEVIS M-1802', type: 'Classic Basin', image: 'images/wash-basin/LEVIS M-1802.jpg' },
            { code: 'M-1803', name: 'LEVIS M-1803', type: 'Modern Basin', image: 'images/wash-basin/LEVIS M-1803.jpg' },
            { code: 'M-1804', name: 'LEVIS M-1804', type: 'Retro Basin', image: 'images/wash-basin/LEVIS M-1804.jpg' },
            { code: 'M-1805', name: 'LEVIS M-1805', type: 'Vintage Basin', image: 'images/wash-basin/LEVIS M-1805.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4801', name: 'LEVIS T-4801', type: 'Stylish Tap', image: 'images/wash-basin/LEVIS T-4801.jpg' },
            { code: 'T-4802', name: 'LEVIS T-4802', type: 'Classic Tap', image: 'images/wash-basin/LEVIS T-4802.jpg' },
            { code: 'T-4803', name: 'LEVIS T-4803', type: 'Modern Tap', image: 'images/wash-basin/LEVIS T-4803.jpg' },
            { code: 'T-4804', name: 'LEVIS T-4804', type: 'Retro Tap', image: 'images/wash-basin/LEVIS T-4804.jpg' },
            { code: 'T-4805', name: 'LEVIS T-4805', type: 'Vintage Tap', image: 'images/wash-basin/LEVIS T-4805.jpg' }
        ],
        strom: [
            { code: 'M-1403', name: 'STROM M-1403', type: 'Smart Basin', image: 'images/wash-basin/STROM M-1403.jpg' },
            { code: 'M-1405', name: 'STROM M-1405', type: 'Sensor Basin', image: 'images/wash-basin/STROM M-1405.jpg' },
            { code: 'M-1406', name: 'STROM M-1406', type: 'Intelligent Basin', image: 'images/wash-basin/STROM M-1406.jpg' },
            { code: 'M-1407', name: 'STROM M-1407', type: 'Digital Basin', image: 'images/wash-basin/STROM M-1407.jpg' },
            // T-Series (Taps/Faucets)
            { code: 'T-4402', name: 'STROM T-4402', type: 'Smart Tap', image: 'images/wash-basin/STROM T-4402.jpg' },
            { code: 'T-4403', name: 'STROM T-4403', type: 'Sensor Tap', image: 'images/wash-basin/STROM T-4403.jpg' },
            { code: 'T-4404', name: 'STROM T-4404', type: 'Touchless Tap', image: 'images/wash-basin/STROM T-4404.jpg' },
            { code: 'T-4405', name: 'STROM T-4405', type: 'Auto Tap', image: 'images/wash-basin/STROM T-4405.jpg' },
            { code: 'T-4408', name: 'STROM T-4408', type: 'Digital Tap', image: 'images/wash-basin/STROM T-4408.jpg' }
        ]
    },

    // FUSION TAPS - Based on images in fusion folder
    fusionTiles: {
        cadiz: [
            { code: 'CA-801', name: 'Cadiz CA-801', type: 'Glossy Finish Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 801.png' },
            { code: 'CA-802', name: 'Cadiz CA-802', type: 'Matt Finish Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 802.png' },
            { code: 'CA-803', name: 'Cadiz CA-803', type: 'Textured Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 803.png' },
            { code: 'CA-804', name: 'Cadiz CA-804', type: 'Marble Effect Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 804.png' },
            { code: 'CA-805', name: 'Cadiz CA-805', type: 'Wood Effect Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 805.png' },
            { code: 'CA-806', name: 'Cadiz CA-806', type: 'Stone Effect Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 806.png' },
            { code: 'CA-807', name: 'Cadiz CA-807', type: 'Concrete Look Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 807.png' },
            { code: 'CA-808', name: 'Cadiz CA-808', type: 'Granite Effect Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 808.png' },
            { code: 'CA-809', name: 'Cadiz CA-809', type: 'Ceramic Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 809.png' },
            { code: 'CA-810', name: 'Cadiz CA-810', type: 'Porcelain Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 810.png' },
            { code: 'CA-811', name: 'Cadiz CA-811', type: 'Designer Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 811.png' },
            { code: 'CA-812', name: 'Cadiz CA-812', type: 'Premium Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 812.png' },
            { code: 'CA-813', name: 'Cadiz CA-813', type: 'Luxury Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 813.png' },
            { code: 'CA-814', name: 'Cadiz CA-814', type: 'Artistic Tap', image: 'images/fusion/Cadiz Series/Ai 2/CA 814.png' }
        ],
        rivo: [
            { code: 'RI-101', name: 'Rivo RI-101', type: 'Modern Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 101.png' },
            { code: 'RI-102', name: 'Rivo RI-102', type: 'Contemporary Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 102.png' },
            { code: 'RI-103', name: 'Rivo RI-103', type: 'Elegant Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 103.png' },
            { code: 'RI-104', name: 'Rivo RI-104', type: 'Stylish Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 104.png' },
            { code: 'RI-105', name: 'Rivo RI-105', type: 'Classic Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 105.png' },
            { code: 'RI-106', name: 'Rivo RI-106', type: 'Traditional Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 106.jpeg' },
            { code: 'RI-107', name: 'Rivo RI-107', type: 'Vintage Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 107.png' },
            { code: 'RI-108', name: 'Rivo RI-108', type: 'Retro Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 108.png' },
            { code: 'RI-109', name: 'Rivo RI-109', type: 'Minimalist Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 109.png' },
            { code: 'RI-110', name: 'Rivo RI-110', type: 'Industrial Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 110.png' },
            { code: 'RI-111', name: 'Rivo RI-111', type: 'Rustic Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 111.png' },
            { code: 'RI-112', name: 'Rivo RI-112', type: 'Urban Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 112.png' },
            { code: 'RI-113', name: 'Rivo RI-113', type: 'Natural Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 113.png' },
            { code: 'RI-114', name: 'Rivo RI-114', type: 'Organic Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 114.png' },
            { code: 'RI-121', name: 'Rivo RI-121', type: 'Exotic Tap', image: 'images/fusion/Rivo Series/Rivo Series 1/RI 121.png' }
        ],
        rossa: [
            { code: 'RS-1001', name: 'Rossa RS-1001', type: 'Red Marble Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1001.png' },
            { code: 'RS-1002', name: 'Rossa RS-1002', type: 'Burgundy Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1002.png' },
            { code: 'RS-1003', name: 'Rossa RS-1003', type: 'Crimson Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1003.png' },
            { code: 'RS-1004', name: 'Rossa RS-1004', type: 'Cherry Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1004.png' },
            { code: 'RS-1005', name: 'Rossa RS-1005', type: 'Rose Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1005.png' },
            { code: 'RS-1006', name: 'Rossa RS-1006', type: 'Coral Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1006.png' },
            { code: 'RS-1007', name: 'Rossa RS-1007', type: 'Scarlet Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1007.png' },
            { code: 'RS-1009', name: 'Rossa RS-1009', type: 'Ruby Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1009.png' },
            { code: 'RS-1010', name: 'Rossa RS-1010', type: 'Garnet Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1010.png' },
            { code: 'RS-1011', name: 'Rossa RS-1011', type: 'Mahogany Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1011.png' },
            { code: 'RS-1012', name: 'Rossa RS-1012', type: 'Brick Red Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1012.png' },
            { code: 'RS-1013', name: 'Rossa RS-1013', type: 'Terracotta Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1013.png' },
            { code: 'RS-1014', name: 'Rossa RS-1014', type: 'Rust Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1014.png' },
            { code: 'RS-1015', name: 'Rossa RS-1015', type: 'Copper Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1015.png' },
            { code: 'RS-1018', name: 'Rossa RS-1018', type: 'Bronze Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1018.png' },
            { code: 'RS-1019', name: 'Rossa RS-1019', type: 'Amber Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1019.png' },
            { code: 'RS-1020', name: 'Rossa RS-1020', type: 'Chestnut Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1020.png' },
            { code: 'RS-1021', name: 'Rossa RS-1021', type: 'Wine Tap', image: 'images/fusion/Rossa Series/Ai 1/RS 1021.png' }
        ]
    },

    // TOILETS - Basic collection
    toilets: {
        basic: [
            { code: 'TOILET-001', name: 'Premium Toilet', type: 'Floor Mounted', image: 'images/toilets/item-2.jpg' }
        ]
    },

    // MANHOLE COVERS - Based on catalog references
    manholeCovers: {
        frp: [
            { code: 'FRP-001', name: 'FRP Round Cover', type: 'Heavy Duty', image: 'images/catalog/frp-cover-1.jpg' },
            { code: 'FRP-002', name: 'FRP Square Cover', type: 'Medium Duty', image: 'images/catalog/frp-cover-2.jpg' }
        ],
        ceramic: [
            { code: 'CER-001', name: 'Ceramic Round Cover', type: 'Decorative', image: 'images/catalog/ceramic-cover-1.jpg' }
        ]
    }
};

// Helper functions to get products
const getProductsByCategory = (category) => {
    return productData[category] || {};
};

const getProductsByCollection = (category, collection) => {
    return productData[category] && productData[category][collection] ? productData[category][collection] : [];
};

const getProductsByType = (category, type) => {
    let products = [];
    if (productData[category]) {
        Object.keys(productData[category]).forEach(collection => {
            const collectionProducts = productData[category][collection];
            const filteredProducts = collectionProducts.filter(product => product.type === type);
            products = products.concat(filteredProducts);
        });
    }
    return products;
};

const getAllProducts = () => {
    let allProducts = [];
    Object.keys(productData).forEach(category => {
        Object.keys(productData[category]).forEach(collection => {
            allProducts = allProducts.concat(productData[category][collection]);
        });
    });
    return allProducts;
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productData, getProductsByCategory, getProductsByCollection, getProductsByType, getAllProducts };
}