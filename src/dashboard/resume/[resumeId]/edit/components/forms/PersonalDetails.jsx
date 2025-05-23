import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { toast } from "sonner";

function PersonalDetails({ enabledNext }) {
  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
    enabledNext(true);
  }, []);

  const handleInputChange = (e) => {
    // enabledNext(false); Should be false when user is typing

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
        toast("Server Error,Please try again");
        console.log(error);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started With Basic Information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="gap-1">
            <label className="text-sm">Email</label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm">Github Url</label>
            <Input
              name="githubURL"
              defaultValue={resumeInfo?.githubURL}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm">LinkedIn Profile</label>
            <Input
              name="linkedinURL"
              defaultValue={resumeInfo?.linkedinURL}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
