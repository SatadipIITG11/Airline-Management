const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyparser = require('body-parser');
const stripe = require('stripe')('');
// const multer  = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname)
//   }
// })

// const upload = multer({ storage: storage })

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// MongoDB connection URI
const uri = '';
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect();

app.use(bodyparser.json());
app.get('/api/airlines', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Airlines');
  collection.find().toArray()
    .then(airline => {
      res.json(airline);
    })
    .catch(err => {
      console.error('Error fetching airlines:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/airlines', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Airlines');
  const data = req.body;
  const result = await collection.insertOne(data);
  res.send(result);
});

app.get('/api/airlines-addflt', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Airlines');
  collection.find().toArray()
    .then(airline => {
      res.json(airline);
    })
    .catch(err => {
      console.error('Error fetching airlines:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/airlines-addflt', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Airlines');
  const data = req.body;
  const result = await collection.updateOne(
    { flightCode: data.flightCode },
    { $push: { flights: data.flightNumber } }
  );
  if (result.modifiedCount === 1) {
    res.status(200).send('Flight number added successfully');
  } else {
    res.status(404).send('No matching flight code found');
  }
});

app.get('/api/airports', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Airports');
  collection.find().toArray()
    .then(airports => {
      res.json(airports);
    })
    .catch(err => {
      console.error('Error fetching airports:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});


app.get('/bookings', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Bookings');
  collection.find().toArray()
    .then(bookings => {
      res.json(bookings);
    })
    .catch(err => {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/bookings', async (req, res) => {
    const db = client.db('Airline');
    const collection = db.collection('Bookings');
    const { email, data, formData, time } = req.body;
    const result = await collection.insertOne({
      email, 
      data, 
      formData,
      time
    });
});

app.get('/fltstatus', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Status');
  collection.find().toArray()
    .then(status => {
      res.json(status);
    })
    .catch(err => {
      console.error('Error fetching flight status:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/fltstatus', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Status');
  const { originAirport_, destinationAirport_, selectedDate_ } = req.body;
  const result = await collection.insertOne({
    originAirport_,
    destinationAirport_,
    selectedDate_,
  });
});

app.get('/api/login', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  collection.find().toArray()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/login', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  const { email, password } = req.body;
  const user = await collection.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    res.json({ success: true, message: 'Login successful', user: {title: user.title, firstName: user.firstName, lastName: user.lastName, mobileNumber: user.mobileNumber}});
});

app.get('/api/users', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  collection.find().toArray()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/users', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  const { title, firstName, lastName, email, password, mobileNumber} = req.body;
  const user = await collection.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Username already Exists' });
    }
    const newUser = { title, firstName, lastName, email, password, mobileNumber };
    await collection.insertOne(newUser);
    res.json({ success: true, message: 'Registered successful' });
});

app.get('/api/update-profile', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  collection.find().toArray()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/update-profile', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  const { email, updatedProfile } = req.body;
  const result = await collection.updateOne(
    { email: email },
    { $set: updatedProfile }
  );
  console.log('Update result:', result);
  if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Profile updated successfully' });
  } else {
      console.log('User not found for update');
      res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/update-profile-on', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  collection.find().toArray()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/update-profile-on', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Users');
  const { email, status } = req.body;
  const result = await collection.updateOne(
    { email: email },
    { $set: {status} }
  );
  console.log('Update status:', status);
  if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Status updated successfully' });
  } else {
      console.log('User not found for update');
      res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/flights', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flights');
  collection.find().toArray()
    .then(flights => {
      res.json(flights);
    })
    .catch(err => {
      console.error('Error fetching flights:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/flights', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flights');
  const data = req.body;

  try {
    const result = await collection.insertOne(data);
    res.status(201).send('Flight added successfully');
  } catch (error) {
    res.status(400).send('Error adding flight: ' + error.message);
  }
});

app.get('/api/flights/count', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flights');
  const counts = await collection.aggregate([
    { $group: { _id: '$flightName', count: { $sum: 1 } } },
    { $project: { flightName: '$_id', count: 1, _id: 0 } }
    ]).toArray();
    res.json(counts);
});

app.get('/api/feedback', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Feedback');
  collection.find().toArray()
    .then(feedback => {
      res.json(feedback);
    })
    .catch(err => {
      console.error('Error fetching feedback:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/feedback', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Feedback');
  const { email, firstImpression, hearAbout, missingAnything, rating } = req.body;
  const result = await collection.insertOne({
    email,
    firstImpression, 
    hearAbout, 
    missingAnything, 
    rating
  });
  res.json({ success: true});
});

app.get('/api/flightinfo', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  collection.find().toArray()
    .then(fltinfo => {
      res.json(fltinfo);
    })
    .catch(err => {
      console.error('Error fetching flight info:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/flightinfo', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  const { flightNumber, departureDate } = req.body;
  const fltinfo = await collection.findOne({ flightNumber, departureDate });
    if (!fltinfo) {
      return res.status(400).json({ success: false, message: 'Invalid' });
    }
    res.json(fltinfo);
});

app.get('/api/flightin', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  collection.find().toArray()
    .then(fltinfo => {
      res.json(fltinfo);
    })
    .catch(err => {
      console.error('Error fetching flight info:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/flightin', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  const data = req.body;
  const fltinfo = await collection.insertOne(data);
    res.json(fltinfo);
});

app.get('/api/flight', (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  collection.find().toArray()
    .then(fltinfo => {
      res.json(fltinfo);
    })
    .catch(err => {
      console.error('Error fetching flight info:', err);
      res.status(500).json({ error: 'Server Error' });
    });
});

app.post('/api/flight', async (req, res) => {
  const db = client.db('Airline');
  const collection = db.collection('Flight Info');
  const { flightNumber, departureTime, arrivalTime, passengers, seat } = req.body;
      const result = await collection.updateOne(
          { flightNumber, departureTime},
          { $inc: { [`seatsAvailable.${seat}`]: -passengers } },
          // {returnDocument: 'after'}
      );

      res.send(result);
});


app.post('/api/payments', async (req, res) => {
  const data = req.body;
  const product = await stripe.products.create({
    name: `${data.data.seat} Class Ticket(s)`
  });

  if(product){
    var price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: data.data.price*100,
      currency: 'INR',
    });
  }

  if(price.id){
    const Data = encodeURIComponent(JSON.stringify(data));
    var session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: `${price.id}`,
          quantity: data.data.passengers
        }
      ],
      mode: "payment",
      success_url: `http://localhost:5173/eticket?info=${Data}`,
      cancel_url: "http://localhost:3000/cancel",
      customer_email: 'john.doe@example.com',
    })
  }
  res.json(session);

});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
