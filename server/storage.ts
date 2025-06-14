import { 
  Destination, 
  InsertDestination, 
  Experience, 
  InsertExperience, 
  Booking, 
  InsertBooking, 
  Inquiry, 
  InsertInquiry, 
  Testimonial, 
  InsertTestimonial,
  User,
  InsertUser
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destinations
  getDestinations(): Promise<Destination[]>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: number, destination: Partial<InsertDestination>): Promise<Destination | undefined>;

  // Experiences
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private experiences: Map<number, Experience>;
  private bookings: Map<number, Booking>;
  private inquiries: Map<number, Inquiry>;
  private testimonials: Map<number, Testimonial>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.experiences = new Map();
    this.bookings = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    // Seed destinations
    const destinationsData: InsertDestination[] = [
      {
        name: "Budapest",
        country: "Hungary",
        description: "Pearl of the Danube with stunning architecture and thermal baths",
        price: 89,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: true,
        available: true,
      },
      {
        name: "Bratislava",
        country: "Slovakia",
        description: "Medieval charm meets modern culture in Slovakia's capital",
        price: 65,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: true,
        available: true,
      },
      {
        name: "Vienna",
        country: "Austria",
        description: "Imperial city of music, art, and coffee culture",
        price: 120,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: true,
        available: true,
      },
    ];

    destinationsData.forEach(dest => this.createDestination(dest));

    // Seed experiences
    const experiencesData: InsertExperience[] = [
      {
        title: "Danube River Cruise",
        description: "Luxury 7-day cruise through 4 countries with premium dining and entertainment",
        price: 1299,
        duration: "7 days",
        groupSize: "Max 20",
        category: "cruise",
        icon: "ship",
        available: true,
      },
      {
        title: "Photography Tour",
        description: "Capture stunning landscapes and architecture with professional guidance",
        price: 159,
        duration: "1 day",
        groupSize: "Max 8",
        category: "photography",
        icon: "camera",
        available: true,
      },
      {
        title: "Culinary Journey",
        description: "Taste authentic regional cuisine and local wines with expert guides",
        price: 459,
        duration: "3 days",
        groupSize: "Max 12",
        category: "culinary",
        icon: "utensils",
        available: true,
      },
      {
        title: "Cultural Heritage",
        description: "Explore castles, museums, and UNESCO World Heritage sites",
        price: 299,
        duration: "2 days",
        groupSize: "Max 15",
        category: "culture",
        icon: "landmark",
        available: true,
      },
    ];

    experiencesData.forEach(exp => this.createExperience(exp));

    // Seed testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        author: "Sarah Johnson",
        location: "New York, USA",
        content: "The AI recommendations were spot-on! Every destination was perfectly curated to our interests. The Danube cruise was absolutely magical.",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        featured: true,
      },
      {
        author: "Michael Chen",
        location: "Singapore",
        content: "Exceptional service and unforgettable experiences. The platform made booking seamless and the local insights were invaluable.",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        featured: true,
      },
      {
        author: "Emma Rodriguez",
        location: "Madrid, Spain",
        content: "A perfect blend of culture, history, and luxury. The AI-powered recommendations helped us discover hidden gems we never would have found.",
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        featured: true,
      },
    ];

    testimonialsData.forEach(testimonial => {
      const id = this.currentId++;
      const testimonialWithTimestamp = {
        ...testimonial,
        id,
        createdAt: new Date(),
      };
      this.testimonials.set(id, testimonialWithTimestamp);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.featured);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentId++;
    const destination: Destination = {
      ...insertDestination,
      id,
      createdAt: new Date(),
    };
    this.destinations.set(id, destination);
    return destination;
  }

  async updateDestination(id: number, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    const destination = this.destinations.get(id);
    if (!destination) return undefined;
    
    const updated = { ...destination, ...updates };
    this.destinations.set(id, updated);
    return updated;
  }

  // Experiences
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.currentId++;
    const experience: Experience = {
      ...insertExperience,
      id,
      createdAt: new Date(),
    };
    this.experiences.set(id, experience);
    return experience;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updated = { ...booking, status };
    this.bookings.set(id, updated);
    return updated;
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      status: "new",
      createdAt: new Date(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.featured);
  }
}

export const storage = new MemStorage();
