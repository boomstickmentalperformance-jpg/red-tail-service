"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
  "/hero6.jpg",
  "/hero7.jpg",
  "/hero8.jpg",
  "/hero10.jpg",
  "/hero11.jpg",
  "/hero12.jpg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [beefFormStatus, setBeefFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  }

  async function handleBeefSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setBeefFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/beef-inquiry", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit beef inquiry");
      }

      setBeefFormStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setBeefFormStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">

      {/* Header */}
      <header className="bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Image
            src="/logo.png"
            alt="Red Tail Service"
            width={500}
            height={500}
            className="h-auto w-[180px] sm:w-[220px]"
            priority
          />

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">

            <a
              href="#services"
              className="transition hover:text-red-700"
            >
              Equipment Services
            </a>

            <a
              href="#beef"
              className="transition hover:text-red-700"
            >
              Beef Sales
            </a>

            <a
              href="#request"
              className="transition hover:text-red-700"
            >
              Request Service
            </a>

          </nav>

        </div>

        <div className="h-1 bg-red-700" />

      </header>


      {/* Hero Slideshow */}
      <section className="relative h-[500px] w-full overflow-hidden sm:h-[600px]">

        {heroImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt="Heavy equipment"
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">

          <div className="max-w-4xl text-white">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
              Red Tail Service
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Heavy Equipment
              <br />
              Repair & Service
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl">
              Select repair and maintenance services for heavy equipment,
              hydraulics, lubrication, and undercarriage systems.
            </p>

            <div className="mt-8">

              <a
                href="#request"
                className="inline-block rounded-md bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800"
              >
                Request Service
              </a>

            </div>

          </div>

        </div>


        {/* Slideshow Indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">

          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === currentImage
                  ? "w-8 bg-red-600"
                  : "w-2 bg-white/70"
              }`}
            />
          ))}

        </div>

      </section>


      {/* Service Area */}
      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            Serving Central Oklahoma
          </p>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Providing Service in the Oklahoma City Metro Area
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Red Tail Service provides selected heavy equipment repair and
            maintenance services throughout the Oklahoma City metro area.
          </p>

        </div>

      </section>


      {/* Service Disclaimer */}
      <section className="border-b border-gray-200 bg-gray-50">

        <div className="mx-auto max-w-6xl px-6 py-5 text-center">

          <p className="text-sm font-semibold text-gray-700">

            <span className="font-bold text-red-700">
              SERVICE NOTICE:
            </span>{" "}

            Red Tail Service does not provide engine or transmission repair
            or overhaul services.

          </p>

        </div>

      </section>


      {/* Services */}
      <section
        id="services"
        className="mx-auto max-w-6xl px-6 py-20"
      >

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            What We Do
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Services Redtail Provides
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Red Tail focuses on selected heavy equipment services that keep
            your equipment working and on the job.
          </p>

        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* Oil & Lubrication */}
          <div className="border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-5 text-4xl">
              🛢️
            </div>

            <h3 className="text-xl font-bold">
              Oil & Lubrication
            </h3>

            <p className="mt-3 leading-relaxed text-gray-600">
              Oil changes and routine lubrication services.
            </p>

          </div>


          {/* Hydraulic Service */}
          <div className="border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-5 text-4xl">
              🔧
            </div>

            <h3 className="text-xl font-bold">
              Hydraulic Service
            </h3>

            <p className="mt-3 leading-relaxed text-gray-600">
              Hydraulic cylinder repair and selected hydraulic services.
            </p>

          </div>


          {/* Track & Undercarriage */}
          <div className="border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-5 text-4xl">
              ⛓️
            </div>

            <h3 className="text-xl font-bold">
              Track & Undercarriage
            </h3>

            <p className="mt-3 leading-relaxed text-gray-600">
              Bulldozer track and undercarriage service.
            </p>

          </div>

        </div>

      </section>


      {/* Request Service Introduction */}
      <section
        id="request"
        className="bg-black px-6 py-24 text-center text-white"
      >

        <div className="mx-auto max-w-4xl">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Service Requests
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Tell Us What You Need
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
            Submit information about your equipment and the service you need.
            Include as much detail as possible, including photos when
            available.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3">

            <div className="border border-gray-700 bg-gray-900 p-5">

              <p className="text-sm font-bold text-red-500">
                01
              </p>

              <h3 className="mt-2 font-bold">
                Describe the Job
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Tell us about your equipment and what needs to be done.
              </p>

            </div>


            <div className="border border-gray-700 bg-gray-900 p-5">

              <p className="text-sm font-bold text-red-500">
                02
              </p>

              <h3 className="mt-2 font-bold">
                Send Photos
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Photos can help us understand the equipment and problem.
              </p>

            </div>


            <div className="border border-gray-700 bg-gray-900 p-5">

              <p className="text-sm font-bold text-red-500">
                03
              </p>

              <h3 className="mt-2 font-bold">
                Red Tail Reviews
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                We review each request before deciding whether we can
                accommodate the job.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Service Request Form */}
      <section
        id="request-form"
        className="bg-gray-50 px-6 py-20"
      >

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Red Tail Service
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Service Request
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Please provide as much information as possible. This helps us
              determine whether we can accommodate your request.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-10 border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
          >

            {/* Customer Information */}
            <div>

              <h3 className="text-xl font-bold">
                Your Information
              </h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold"
                  >
                    Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold"
                  >
                    Company / Business
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold"
                  >
                    Phone *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>

              </div>

            </div>


            {/* Equipment Information */}
            <div className="border-t border-gray-200 pt-10">

              <h3 className="text-xl font-bold">
                Equipment Information
              </h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="equipmentType"
                    className="block text-sm font-semibold"
                  >
                    Equipment Type *
                  </label>

                  <select
                    id="equipmentType"
                    name="equipmentType"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-700"
                  >

                    <option value="">
                      Select equipment type
                    </option>

                    <option value="Skid Loader">
                      Skid Loader
                    </option>

                    <option value="Bulldozer">
                      Bulldozer
                    </option>

                    <option value="Backhoe">
                      Backhoe
                    </option>

                    <option value="Telehandler">
                      Telehandler
                    </option>

                    <option value="Boom Lift">
                      Boom Lift
                    </option>

                    <option value="Excavator">
                      Excavator
                    </option>

                    <option value="Tractor">
                      Tractor
                    </option>

                    <option value="Other Heavy Equipment">
                      Other Heavy Equipment
                    </option>

                  </select>

                </div>


                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-semibold"
                  >
                    Service Needed *
                  </label>

                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-700"
                  >

                    <option value="">
                      Select service
                    </option>

                    <option value="Oil & Lubrication">
                      Oil & Lubrication
                    </option>

                    <option value="Hydraulic Service">
                      Hydraulic Service
                    </option>

                    <option value="Track & Undercarriage">
                      Track & Undercarriage
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div>
                  <label
                    htmlFor="make"
                    className="block text-sm font-semibold"
                  >
                    Make
                  </label>

                  <input
                    id="make"
                    name="make"
                    type="text"
                    placeholder="Example: Caterpillar"
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-semibold"
                  >
                    Model
                  </label>

                  <input
                    id="model"
                    name="model"
                    type="text"
                    placeholder="Example: D6"
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-semibold"
                  >
                    Year
                  </label>

                  <input
                    id="year"
                    name="year"
                    type="text"
                    placeholder="Example: 2018"
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>


                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold"
                  >
                    Equipment Location *
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City / Area"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />
                </div>

              </div>

            </div>


            {/* Problem Description */}
            <div className="border-t border-gray-200 pt-10">

              <h3 className="text-xl font-bold">
                Tell Us About the Job
              </h3>

              <div className="mt-6">

                <label
                  htmlFor="description"
                  className="block text-sm font-semibold"
                >
                  Describe the problem or service needed *
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={7}
                  placeholder="Please describe what is happening with the equipment and what you need done."
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                />

              </div>

            </div>


            {/* Photos */}
            <div className="border-t border-gray-200 pt-10">

              <h3 className="text-xl font-bold">
                Photos
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Upload photos of the equipment and the problem if possible.
                Multiple photos can be selected.
              </p>

              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                className="mt-5 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm"
              />

            </div>


            {/* Disclaimer */}
            <div className="border-t border-gray-200 pt-10">

              <label className="flex items-start gap-3">

                <input
                  type="checkbox"
                  name="acknowledgment"
                  required
                  className="mt-1 h-4 w-4 accent-red-700"
                />

                <span className="text-sm leading-relaxed text-gray-600">
                  I understand that submitting a service request does not
                  guarantee service. Red Tail Service reviews requests
                  individually based on the type of work, location,
                  availability, and scheduling.
                </span>

              </label>

            </div>


            {/* Submit */}
            <div className="border-t border-gray-200 pt-10">

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full rounded-md bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formStatus === "submitting"
                  ? "Submitting Request..."
                  : "Submit Service Request"}
              </button>


              {formStatus === "success" && (
                <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-5 text-center text-green-800">

                  <p className="font-bold">
                    Request Received
                  </p>

                  <p className="mt-1 text-sm">
                    Your service request has been submitted to Red Tail
                    Service. Your request will be reviewed and you will be
                    contacted if the job can be accommodated.
                  </p>

                </div>
              )}


              {formStatus === "error" && (
                <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-5 text-center text-red-800">

                  <p className="font-bold">
                    Something went wrong.
                  </p>

                  <p className="mt-1 text-sm">
                    Your request could not be submitted. Please try again.
                  </p>

                </div>
              )}

            </div>

          </form>

        </div>

      </section>


      {/* Beef Sales */}
      <section
        id="beef"
        className="bg-gray-50 px-6 py-20"
      >

        <div className="mx-auto max-w-6xl">

          {/* Beef Introduction */}
          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
              Red Tail Beef
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Locally Raised Beef
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Red Tail offers butcher beef periodically throughout the year.
              See current pricing below and submit an inquiry for availability.
            </p>

          </div>


          {/* Cattle Photo + Information */}
          <div className="mt-12 overflow-hidden rounded-lg bg-black">

            <div className="grid md:grid-cols-2">

              {/* Cattle Photo */}
              <div className="relative min-h-[450px]">

                <Image
                  src="/hero9.jpg"
                  alt="Red Tail cattle"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

              </div>


              {/* Beef Information */}
              <div className="flex items-center px-8 py-14 text-white sm:px-14">

                <div className="w-full">

                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                    Red Tail Beef
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Locally Raised Beef
                  </h2>

                  <p className="mt-5 leading-relaxed text-gray-300">
                    Butcher beef is available periodically. Pricing is listed
                    below, and availability may vary throughout the year.
                  </p>


                  {/* Pricing */}
                  <div className="mt-8 space-y-3">

                    <div className="flex items-center justify-between border-b border-gray-700 pb-3">

                      <span className="font-semibold">
                        Quarter Beef
                      </span>

                      <span className="text-xl font-extrabold text-red-500">
                        $800
                      </span>

                    </div>


                    <div className="flex items-center justify-between border-b border-gray-700 pb-3">

                      <span className="font-semibold">
                        Half Beef
                      </span>

                      <span className="text-xl font-extrabold text-red-500">
                        $1,600
                      </span>

                    </div>


                    <div className="flex items-center justify-between">

                      <span className="font-semibold">
                        Whole Beef
                      </span>

                      <span className="text-xl font-extrabold text-red-500">
                        $3,200
                      </span>

                    </div>

                  </div>


                  <a
                    href="#beef-inquiry"
                    className="mt-8 inline-block rounded-md bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800"
                  >
                    Beef Inquiry
                  </a>

                </div>

              </div>

            </div>

          </div>


          {/* Beef Inquiry Form */}
          <div
            id="beef-inquiry"
            className="mx-auto mt-16 max-w-4xl"
          >

            <div className="text-center">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Beef Inquiry
              </p>

              <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Interested in Red Tail Beef?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Submit the form below to ask about current availability.
              </p>

            </div>


            <form
              onSubmit={handleBeefSubmit}
              className="mt-10 space-y-8 border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
            >

              {/* Customer Information */}
              <div>

                <h4 className="text-xl font-bold">
                  Your Information
                </h4>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="beefName"
                      className="block text-sm font-semibold"
                    >
                      Name *
                    </label>

                    <input
                      id="beefName"
                      name="beefName"
                      type="text"
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="beefCompany"
                      className="block text-sm font-semibold"
                    >
                      Company / Business
                    </label>

                    <input
                      id="beefCompany"
                      name="beefCompany"
                      type="text"
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="beefPhone"
                      className="block text-sm font-semibold"
                    >
                      Phone *
                    </label>

                    <input
                      id="beefPhone"
                      name="beefPhone"
                      type="tel"
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="beefEmail"
                      className="block text-sm font-semibold"
                    >
                      Email *
                    </label>

                    <input
                      id="beefEmail"
                      name="beefEmail"
                      type="email"
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                    />

                  </div>

                </div>

              </div>


              {/* Beef Details */}
              <div className="border-t border-gray-200 pt-8">

                <h4 className="text-xl font-bold">
                  What Are You Interested In?
                </h4>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="beefQuantity"
                      className="block text-sm font-semibold"
                    >
                      Amount of Beef *
                    </label>

                    <select
                      id="beefQuantity"
                      name="beefQuantity"
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-700"
                    >

                      <option value="">
                        Select an option
                      </option>

                      <option value="Quarter Beef - $800">
                        Quarter Beef — $800
                      </option>

                      <option value="Half Beef - $1,600">
                        Half Beef — $1,600
                      </option>

                      <option value="Whole Beef - $3,200">
                        Whole Beef — $3,200
                      </option>

                      <option value="Not Sure Yet">
                        Not Sure Yet
                      </option>

                    </select>

                  </div>


                  <div>

                    <label
                      htmlFor="beefTimeframe"
                      className="block text-sm font-semibold"
                    >
                      When Are You Looking to Purchase? *
                    </label>

                    <select
                      id="beefTimeframe"
                      name="beefTimeframe"
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-700"
                    >

                      <option value="">
                        Select a timeframe
                      </option>

                      <option value="As soon as available">
                        As soon as available
                      </option>

                      <option value="Within 1-3 months">
                        Within 1–3 months
                      </option>

                      <option value="Within 3-6 months">
                        Within 3–6 months
                      </option>

                      <option value="Later this year">
                        Later this year
                      </option>

                      <option value="Just researching">
                        Just researching
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* Previous Experience */}
              <div className="border-t border-gray-200 pt-8">

                <h4 className="text-xl font-bold">
                  A Little More Information
                </h4>

                <div className="mt-6">

                  <label
                    htmlFor="beefExperience"
                    className="block text-sm font-semibold"
                  >
                    Have you purchased whole or half beef before? *
                  </label>

                  <select
                    id="beefExperience"
                    name="beefExperience"
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-700"
                  >

                    <option value="">
                      Select an option
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="No">
                      No
                    </option>

                    <option value="Not sure">
                      Not sure
                    </option>

                  </select>

                </div>


                <div className="mt-6">

                  <label
                    htmlFor="beefMessage"
                    className="block text-sm font-semibold"
                  >
                    Questions or Additional Information
                  </label>

                  <textarea
                    id="beefMessage"
                    name="beefMessage"
                    rows={6}
                    placeholder="Tell us anything else you'd like us to know..."
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-red-700"
                  />

                </div>

              </div>


              {/* Acknowledgment */}
              <div className="border-t border-gray-200 pt-8">

                <label className="flex items-start gap-3">

                  <input
                    type="checkbox"
                    name="beefAcknowledgment"
                    required
                    className="mt-1 h-4 w-4 accent-red-700"
                  />

                  <span className="text-sm leading-relaxed text-gray-600">
                    I understand that submitting an inquiry does not guarantee
                    availability. Beef availability varies throughout the
                    year.
                  </span>

                </label>

              </div>


              {/* Submit */}
              <div className="border-t border-gray-200 pt-8">

                <button
                  type="submit"
                  disabled={beefFormStatus === "submitting"}
                  className="w-full rounded-md bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {beefFormStatus === "submitting"
                    ? "Submitting Inquiry..."
                    : "Submit Beef Inquiry"}
                </button>


                {beefFormStatus === "success" && (
                  <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-5 text-center text-green-800">

                    <p className="font-bold">
                      Inquiry Received
                    </p>

                    <p className="mt-1 text-sm">
                      Your beef inquiry has been submitted to Red Tail
                      Service. Your inquiry will be reviewed and you will be
                      contacted regarding availability.
                    </p>

                  </div>
                )}


                {beefFormStatus === "error" && (
                  <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-5 text-center text-red-800">

                    <p className="font-bold">
                      Something went wrong.
                    </p>

                    <p className="mt-1 text-sm">
                      Your inquiry could not be submitted. Please try again.
                    </p>

                  </div>
                )}

              </div>

            </form>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black px-6 py-12 text-center text-white">

        <p className="text-xl font-bold">
          Red Tail Service
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Heavy Equipment Repair & Service
        </p>

        <p className="mt-5 text-xs text-gray-500">
          Serving the Oklahoma City Metro Area
        </p>

      </footer>

    </main>
  );
}