const timeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  seconds: {
    type: number,
    required: true
  }
})