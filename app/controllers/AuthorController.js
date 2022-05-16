import moment from 'moment';
const path = require('path');
const config = require(path.resolve('app/config/database.js'));
const client = config.data;

exports.getBookByAuthor = async (req, res) => {
 
  const author_id = req.params.author_id
    try {
      const id = req.params.id
      client.query('SELECT * FROM books WHERE author_id = $1', [author_id], async (error, results) => {
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

exports.getProfileByAuthor = async (req, res) => {
 
  const author_id = req.params.author_id
    try {
      const id = req.params.id
      client.query('SELECT * FROM authors WHERE id = $1', [author_id], async (error, results) => {
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

exports.delete = async (req, res) => {
 
  try {
    const author_id = req.params.author_id
    client.query('UPDATE authors SET is_disabled = "true" WHARE id = $1 ', [author_id], async (error, results) => {
      if (error) {
       res.status(400).json('Sorry!!Unable To Update');
       console.log(error)
      }
         res.send(JSON.stringify({"status": 200, "message": "author deleted"}));
     })
 } catch (error) {
  res.status(500).json('Server not found');
  console.log(error)
 }

}

exports.update = async (req, res) => {
  const updated_time = moment(new Date())
   try {
      const {name, pen_name, author_id} = req.body
      client.query('UPDATE authors SET name = $1, pen_name = $2, updated_time = $3 WHARE id = $4', [name, pen_name, updated_time, author_id], async (error, results) => {
           if (error) {
            res.status(400).json('Sorry!!Unable To Update');
            console.log(error)
           }
           res.send(JSON.stringify({"status": 200, "message": "Author updated Successfully!!", "response": req.body}));
       })
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}

