const Product = require('../model/Product')

const AddProduct = async(req,res)=>{
    const {name, category, price,} = req.body
    const image = req.file.path
    try{
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const newProduct = new Product({
            name,
            category,
            price,
             image: `${req.protocol}://${req.get('host')}/${image}`
        })
        await  newProduct.save()
        res.status(200).json({
            message:'Product added successfully',
            product:newProduct,
        })
    }catch(error){
        console.log('Error in adding the product', error)
    }
}

const DeleteProduct = async(req,res) =>{
    const {id} = req.params
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({
                message:'product not found',
            })
        }
        res.status(200).json({message:'product deleted successfully'})
    }catch(error){
        console.log('error in deleting product',error)
    }
}

module.exports = {AddProduct,DeleteProduct}