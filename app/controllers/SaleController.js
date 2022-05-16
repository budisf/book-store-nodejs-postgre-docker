import moment from 'moment';
const path = require('path');
const config = require(path.resolve('app/config/database.js'));
const client = config.data;

exports.store = async (req, res) => {
 
   const created_time =  moment(new Date())
   const {recipient_name, recipient_email, book_title, author_id, book_id, quantity, price_per_unit, price_total} = req.body
   var query = client.query("INSERT INTO sales (recipient_name, recipient_email, book_title, author_id, book_id, quantity, price_per_unit, price_total, created_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
   [recipient_name, recipient_email, book_title, author_id, book_id, quantity, price_per_unit, price_total, created_time], async (error, results) => {
        if (error) {
          res.status(400).json('Sorry!!Unable To Add');
          console.log(error)
        } else {
            console.log(results)
            //If success
            res.status(200).json('sale added Successfully!!')
        }
    });

}

exports.getMySales = async (req, res) => {
 
  const author_id = req.params.author_id
    try {
      const id = req.params.id
      client.query('SELECT * FROM sales WHERE author_id = $1', [author_id], async (error, results) => {
           if (error) {
            res.status(400).json('Sorry!! Unable To Get');
            console.log(error)
           }
           res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
           
       })
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}

exports.getSaleById = async (req, res) => {
 
  const author_id = req.params.author_id
    try {
      const id = req.params.id
      client.query('SELECT * FROM sales WHERE id = $1', [author_id], async (error, results) => {
           if (error) {
            res.status(400).json('Sorry!! Unable To Get');
            console.log(error)
           }
           res.send(JSON.stringify({"status": 200, "error": null, "response": results.row[0]}));
           
       })
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}


