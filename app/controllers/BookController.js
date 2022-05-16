const path = require('path');
const config = require(path.resolve('app/config/database.js'));
const client = config.data;

exports.index = async (req, res) => {
  const results = await client
    .query("SELECT * FROM books")
    .then((payload) => {
      return payload.rows;
  })
    .catch(() => {
      throw new Error("Query failed");
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
}

exports.store = async (req, res) => {
 
   const {title, author_id, stock, price, cover} = req.body
   var query = client.query("INSERT INTO books (title, author_id, stock, price, cover) VALUES ($1, $2, $3, $4, $5)", [title, author_id, stock, price, cover], async (error, results) => {
        if (error) {
          res.status(400).json('Sorry!!Unable To Add');
          console.log(error)
        } else {
            console.log(results)
            //If success
            res.status(200).json('Book Added Successfully!!')
        }
    });

}

exports.delete = async (req, res) => {
 
  try {
    const id = req.params.id
    client.query('DELETE FROM books WHERE id = $1', [id], async (error, results) => {
         if (error) {
          res.status(400).json('Sorry!! Unable To Delete');
          console.log(error)
         }
         res.send(JSON.stringify({"status": 200, "message": "book deleted"}));
     })
 } catch (error) {
  res.status(500).json('Server not found');
  console.log(error)
 }

}

exports.update = async (req, res) => {
  const id = req.params.id
   try {
      const {title, stock, price} = req.body
      client.query('UPDATE books SET title = $1, stock = $2, price = $3 WHERE id = $4', [title, stock, price, id], async (error, results) => {
           if (error) {
            res.status(400).json('Sorry!!Unable To Update');
            console.log(error)
           }
           res.send(JSON.stringify({"status": 200, "message": "Book updated Successfully!!", "response": req.body}));
       })
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}

exports.updateCover = async (req, res) => {
  const id = req.params.id
   try {
      if (!req.files) {
        res.send({
          status  : false,
          message: 'File not upload'
        });
      } else {
        let photo = req.files.file;
        const cover = '/public/assets/img/cover_book/'+photo.name
        //move photo to uploads directory
        uploadPath = './public/assets/img/cover_article/'+photo.name;
        photo.mv(uploadPath, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        const {title, stock, price} = req.body
        client.query('UPDATE books SET cover = $1 WHERE id = $2', [cover, id], async (error, results) => {
            if (error) {
              res.status(400).json('Sorry!!Unable To Update');
              console.log(error)
            }
            res.send(JSON.stringify({"status": 200, "message": "Cover updated Successfully!!", "response": req.body}));
        })
        }
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}

exports.get = async (req, res) => {
 
  const id = req.params.id
    try {
      const id = req.params.id
      client.query('SELECT * FROM books WHERE id = $1', [id], async (error, results) => {
           if (error) {
            res.status(400).json('Sorry!! Unable To Get');
            console.log(error)
           }
           res.send(JSON.stringify({"status": 200, "error": null, "response": results.rows[0]}));
           
       })
   } catch (error) {
    res.status(500).json('Server not found');
    console.log(error)
   }

}