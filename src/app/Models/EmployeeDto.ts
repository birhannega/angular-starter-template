export class EmployeeDto {
  FirstName: string | undefined;
  LastName: string | undefined;
  Gender: string | undefined;
  BirthDate: Date | undefined;
  DepartmentId: number | undefined;
  AddressId: number | undefined;
  EmployeeAddress: CreateAddressDto | undefined;
}

export class CreateAddressDto {
  public Region: string | undefined;
  public Zone: string | undefined;
  public Woreda: string | undefined;
  public Mobile: number | undefined;
  public Telephone: string | undefined;
}
