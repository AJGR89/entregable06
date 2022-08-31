//Require the dev-dependencies
const expect = require("chai").expect;
const { PORT } = require("../src/config");
const request = require("supertest");
const { app } = require("../src/index");

let id = "";
const productToAdd = {
  title: 'Organizador De Cables Usb Auriculares Nylon Super Adhesivo desde test',
  price: '4990',
  thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_671403-MLA45468084665_042021-O.webp',
}
const productToupdate = {
  title: 'Organizador De Cables Usb Auriculares Nylon Super Adhesivo desde test update',
  price: '600',
  thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_671403-MLA45468084665_042021-O.webp',
}

describe("Main suite", () => {
  describe("api/productos", function () {
    it("responds successfull all products", async function () {
      try {
        const res = await request(app).get("/api/productos");
        // console.log(res.body)
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("Object");
        expect(res.body.products).to.be.a("Array");
        expect(res.body.products[0]).to.have.property("_id");
        expect(res.body.products[0]).to.have.property("title");
        expect(res.body.products[0]).to.have.property("price");
        expect(res.body.products[0]).to.have.property("thumbnail");
        expect(res.body.products[0]).to.have.property("createdAt");
        expect(res.body.products[0]).to.have.property("updatedAt");
        id = res.body.products[0]._id;
      } catch (error) {
        console.log(error);
      }
    });
    it("responds successfull getproductbyid", async function () {
      try {
        // console.log("Id to search ", id);
        const res = await request(app).get(`/api/productos/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("Object");

        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("price");
        expect(res.body).to.have.property("thumbnail");
        expect(res.body).to.have.property("createdAt");
        expect(res.body).to.have.property("updatedAt");
      } catch (error) {
        console.log(error);
      }
    });
    it("responds successfull addproduct", async function () {
      try {
        // console.log("Id to search ", id);
        const res = await request(app).post(`/api/productos/`).send(productToAdd);
        // console.log(res)
        expect(res.status).to.equal(302);
      } catch (error) {
        console.log(error);
      }
    });
    it("responds successfull update product by id", async function () {
      try {
        // console.log("Id to search ", id);
        const res = await request(app).put(`/api/productos/${id}`).send(productToAdd);
        // console.log(res)
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("msg");
      } catch (error) {
        console.log(error);
      }
    });
    it("responds successfull delete product by id", async function () {
      try {
        console.log("Id to delete ", id);
        const res = await request(app).delete(`/api/productos/${id}`);
        // console.log(res)
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("msg");
      } catch (error) {
        console.log("error delete");
      }
    });
  });
});
