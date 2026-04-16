export interface Branch {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  address: string;
  provinceId: string;
  districtId: string;
  subDistrictId: string;
  postalCode: string;
  telp1: string;
  telp2: string;
  telp3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  latitude: string;
  longitude: string;
  gmapsLink: string;
  region: {
    province: {
      provinceId: string;
      province: string;
    };
    district: {
      districtId: string;
      provinceId: string;
      district: string;
      kdArea: string;
    };
    subDistrict: {
      subDistrictId: string;
      districtId: string;
      subDistrict: string;
    };
  };
}

export interface BranchApiResponse {
  code: number;
  status: string;
  data: Branch[];
}
