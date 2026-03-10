import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : ProductCategory;
    price : ?Nat;
    imageUrl : Text;
    isFeatured : Bool;
    isWholesaleAvailable : Bool;
    festivalTag : ?FestivalTag;
  };

  type ProductCategory = {
    #artificialFlowers;
    #weddingAccessories;
    #radhaKrishnaPujaItems;
    #murtiDecoration;
    #decorativePapers;
    #thermocolItems;
    #chundriFabrics;
    #photoMala;
    #birthdayEventDecor;
    #rakhiCollection;
    #photoFraming;
    #ganeshPujaItems;
  };

  type FestivalTag = {
    #diwali;
    #wedding;
    #rakhi;
    #ganeshPuja;
    #dussehra;
    #birthday;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    inquiryType : InquiryType;
    productInterest : Text;
  };

  type InquiryType = {
    #retail;
    #wholesale;
  };

  module Product {
    public func compareById(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };

    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  let productMap = Map.empty<Nat, Product>();
  let inquiryMap = Map.empty<Nat, Inquiry>();
  var nextProductId = 0;
  var nextInquiryId = 0;

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    category : ProductCategory,
    price : ?Nat,
    imageUrl : Text,
    isFeatured : Bool,
    isWholesaleAvailable : Bool,
    festivalTag : ?FestivalTag,
  ) : async Nat {
    let productId = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id = productId;
      name;
      description;
      category;
      price;
      imageUrl;
      isFeatured;
      isWholesaleAvailable;
      festivalTag;
    };

    productMap.add(productId, product);
    productId;
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (productMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func searchProductsByName(name : Text) : async [Product] {
    productMap.values().toArray().filter(
      func(p) {
        p.name.toLower().contains(#text(name.toLower()));
      }
    );
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    productMap.values().toArray().filter(
      func(p) {
        p.category == category;
      }
    );
  };

  public query ({ caller }) func getProductsByFestivalTag(tag : FestivalTag) : async [Product] {
    productMap.values().toArray().filter(
      func(p) {
        switch (p.festivalTag) {
          case (null) { false };
          case (?t) { t == tag };
        };
      }
    );
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    productMap.values().toArray().filter(
      func(p) {
        p.isFeatured;
      }
    );
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    phone : Text,
    email : Text,
    message : Text,
    inquiryType : InquiryType,
    productInterest : Text,
  ) : async Nat {
    let inquiryId = nextInquiryId;
    nextInquiryId += 1;

    let inquiry : Inquiry = {
      id = inquiryId;
      name;
      phone;
      email;
      message;
      inquiryType;
      productInterest;
    };

    inquiryMap.add(inquiryId, inquiry);
    inquiryId;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiryMap.values().toArray();
  };

  public shared ({ caller }) func seedSampleProducts() : async () {
    ignore addProduct(
      "Marigold Flower Garland",
      "Artificial marigold flower garland for decorations",
      #artificialFlowers,
      ?199,
      "/images/marigold-garland.jpg",
      true,
      true,
      ?#diwali,
    );

    ignore addProduct(
      "Wedding Kalash Set",
      "Traditional wedding kalash set for rituals",
      #weddingAccessories,
      ?499,
      "/images/wedding-kalash.jpg",
      true,
      false,
      ?#wedding,
    );

    ignore addProduct(
      "Radha Krishna Statue",
      "Beautiful Radha Krishna statue for puja room",
      #radhaKrishnaPujaItems,
      ?999,
      "/images/radha-krishna.jpg",
      true,
      true,
      null,
    );

    ignore addProduct(
      "Thermocol Rangoli Set",
      "Vibrant thermocol rangoli set for floor decor",
      #thermocolItems,
      ?299,
      "/images/thermocol-rangoli.jpg",
      false,
      true,
      ?#diwali,
    );

    ignore addProduct(
      "Ganesh Puja Kit",
      "Complete puja kit for Ganesh Chaturthi",
      #ganeshPujaItems,
      ?599,
      "/images/ganesh-puja-kit.jpg",
      true,
      false,
      ?#ganeshPuja,
    );
  };
};
