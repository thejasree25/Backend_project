const multer = require('multer');
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined; // Get uploaded image filename

        // Check if vendor exists
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        if(vendor.firm.length>0){
            return res.status(400).json({message:"vendor can have only one firm"});
        }
        // Create and save new firm
        const firm= new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image, // Save image filename
            vendor: vendor._id
        });
        const savedFirm=await firm.save();
        const firmId=savedFirm._id
        vendor.firm.push(savedFirm)
        await vendor.save()
        
        // await newFirm.save();
        return res.status(200).json({ message: "Firm Added successfully", firmId});

        // return res.status(200).json({ message: "Firm Added successfully",firmId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// Corrected Export Syntax
module.exports = { addFirm: [upload.single('image'), addFirm] ,deleteFirmById};