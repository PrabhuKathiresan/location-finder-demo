const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs');
const csv = require('csvtojson');

const Location = require('../models/location');

module.exports = {
  upload: (req, res) => {
    const form = new IncomingForm();

    form.on("file", async (field, file) => {
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
      try {
        const locations = [];
        const data = fs.readFileSync(file.path);
        const rows = await csv().fromString(data.toString('utf8'));
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const document = await Location.findOne({
            user: req.user._id,
            name: row.location
          });
          if (document) {
            document.geo.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)]
            const updatedDoc = await document.save();
            locations.push(updatedDoc);
          } else {
            const location = new Location({
              user: req.user._id,
              name: row.location,
              geo: {
                type: 'Point',
                coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
              }
            });
            const newDoc = await location.save();
            locations.push(newDoc);
          }
        }
        res.json({ locations });
      } catch (error) {
        console.log(error);
      }
    });
    form.on("end", () => { });
    form.parse(req);
  },
  find: async (req, res) => {
    try {
      const locations = await Location.find({ user: req.user._id });
      res.json({ locations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  search: async (req, res) => {
    try {
      const { location } = req.body;
      const locations = await Location.find({
        user: req.user._id,
        geo: {
          $near: {
            $maxDistance: 5000, // 5kms
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(location.geo.coordinates[0]), parseFloat(location.geo.coordinates[1])]
            }
          }
        }
      });
      res.json({ locations });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}