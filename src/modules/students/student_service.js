import Student from "./student_model.js";

export const StudentService = {
  async create(data) {
    return await Student.create(data);
  },

  async findAll() {
    return await Student.find();
  },

  async findById(id) {
    return await Student.findById(id);
  },

  async update(id, data) {
    return await Student.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return await Student.findByIdAndDelete(id);
  },

  //searching...🔍
  async searchStudents({ page = 1, limit = 20, query = {} }) {
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.name) filter.fullName = { $regex: query.name, $options: "i" };
    if (query.class) filter['academic.class'] = query.class;
    if (query.admissionNo) filter['academic.admissionNo'] = query.admissionNo;

    if (query.startDate && query.endDate) {
      filter['academic.dateOfAdmission'] = {
        $gte: new Date(query.startDate),
        $lte: new Date(query.endDate),
      };
    }

    const data = await Student.find(filter).skip(skip).limit(limit);
    const total = await Student.countDocuments(filter);

    return { total, page, pages: Math.ceil(total / limit), data };
  },
};

export default StudentService;
