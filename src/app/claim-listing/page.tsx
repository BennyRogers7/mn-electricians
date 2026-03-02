import { getAllCities } from "@/lib/data";
import ClaimForm from "./ClaimForm";

export const metadata = {
  title: "Claim Your Listing",
  description: "Claim your free electrical business listing on MN Electricians Directory. Update your information and get more customers.",
};

export default function ClaimListingPage() {
  const cities = getAllCities();

  return (
    <div className="min-h-screen bg-[#fafaf8] py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e3a5f] mb-4">
            Claim Your Listing
          </h1>
          <p className="text-gray-600 text-lg">
            Own an electrical business in Minnesota? Claim your free listing to update your information, add photos, and get more customers.
          </p>
          <p className="text-[#2563eb] font-medium mt-3">
            Your business needs to be verified to be connected to customers.
          </p>
        </div>

        <ClaimForm cities={cities} />

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>By submitting this form, you confirm that you are the owner or authorized representative of this business.</p>
        </div>
      </div>
    </div>
  );
}
