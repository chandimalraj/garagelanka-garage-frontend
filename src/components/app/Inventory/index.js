import { Box, ButtonBase, Grid } from "@mui/material";
import React from "react";
import { useMemo } from "react";

import inventoryBodyIcon from "../../../assets/images/inventory/inventory-body.svg";
import inventoryBrakeSystemIcon from "../../../assets/images/inventory/inventory-brake_system.svg";
import inventoryAirConditioningIcon from "../../../assets/images/inventory/inventory-air_conditioning.svg";
import inventoryCarAccessoriesIcon from "../../../assets/images/inventory/inventory-car_accessories.svg";
import inventoryClutchSystemIcon from "../../../assets/images/inventory/inventory-clutch_system.svg";
import inventoryElectricComponentsIcon from "../../../assets/images/inventory/inventory-electric_components.svg";
import inventoryEngineCoolingSystemIcon from "../../../assets/images/inventory/inventory-engine_cooling_system.svg";
import inventoryEngineIcon from "../../../assets/images/inventory/inventory-engine.svg";
import inventoryExhaustSystemIcon from "../../../assets/images/inventory/inventory-exhaust_system.svg";
import inventoryFiltersIcon from "../../../assets/images/inventory/inventory-filters.svg";
import inventoryFuelSupplySystemIcon from "../../../assets/images/inventory/inventory-fuel_supply_system.svg";
import inventoryGasketsAndSealingRingsIcon from "../../../assets/images/inventory/inventory-gaskets_and_sealing_rings.svg";
import inventoryIgnitionAndGrowplugSystemIcon from "../../../assets/images/inventory/inventory-ignition_and_growplug_system.svg";
import inventoryInteriorAndComfortIcon from "../../../assets/images/inventory/inventory-interior_and_comfort.svg";
import inventoryLightingIcon from "../../../assets/images/inventory/inventory-lighting.svg";
import inventoryOilsAndFuelsIcon from "../../../assets/images/inventory/inventory-oils_and_fuels.svg";
import inventoryPipesAndHosesIcon from "../../../assets/images/inventory/inventory-pipes_and_hoses.svg";
import inventoryRepairKitsIcon from "../../../assets/images/inventory/inventory-repair_kits.svg";
import inventorySensorsAndControlUnitsIcon from "../../../assets/images/inventory/inventory-sensors_relays_and_control_units.svg";
import inventorySteeringIcon from "../../../assets/images/inventory/inventory-steering.svg";
import inventorySuspensionAndArmsIcon from "../../../assets/images/inventory/inventory-suspension_and_arms.svg";
import inventoryTowbarPartsIcon from "../../../assets/images/inventory/inventory-towbar_parts.svg";
import inventoryTransmissionIcon from "../../../assets/images/inventory/inventory-transmission.svg";
import inventoryTrimsIcon from "../../../assets/images/inventory/inventory-trims.svg";
import inventoryTyresAndAlloysIcon from "../../../assets/images/inventory/inventory-tyres_and_alloys.svg";
import inventoryUniversalIcon from "../../../assets/images/inventory/inventory-universal.svg";
import inventoryWheelsIcon from "../../../assets/images/inventory/inventory-wheels.svg";
import inventoryMaintenanceServicePartsIcon from "../../../assets/images/inventory/inventory-maintenance_service_parts.svg";
import inventoryWindscreenCleaningSystemIcon from "../../../assets/images/inventory/inventory-windscreen_cleaning_system.svg";
import inventoryBeltChainsAndRollersIcon from "../../../assets/images/inventory/inventory-belt_chains_and_rollers.svg";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCategories } from "../../../services/inventoryService";
import "./inventory.css";
import { showToasts } from "../../toast";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [partTypes, setPartTypes] = useState([]);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const categoryImages = useMemo(
    () => ({
      body: inventoryBodyIcon,
      brake_system: inventoryBrakeSystemIcon,
      air_conditioning: inventoryAirConditioningIcon,
      car_accessories: inventoryCarAccessoriesIcon,
      clutch_system: inventoryClutchSystemIcon,
      electric_components: inventoryElectricComponentsIcon,
      engine_cooling_system: inventoryEngineCoolingSystemIcon,
      engine: inventoryEngineIcon,
      exhaust_system: inventoryExhaustSystemIcon,
      filters: inventoryFiltersIcon,
      fuel_supply_system: inventoryFuelSupplySystemIcon,
      gaskets_and_sealing_rings: inventoryGasketsAndSealingRingsIcon,
      ignition_and_growplug_system: inventoryIgnitionAndGrowplugSystemIcon,
      interior_and_comfort: inventoryInteriorAndComfortIcon,
      lightning: inventoryLightingIcon,
      oils_and_fuels: inventoryOilsAndFuelsIcon,
      pipes_and_hoses: inventoryPipesAndHosesIcon,
      repair_kits: inventoryRepairKitsIcon,
      sensors_relays_and_control_units: inventorySensorsAndControlUnitsIcon,
      steering: inventorySteeringIcon,
      suspension_and_arms: inventorySuspensionAndArmsIcon,
      towbar_parts: inventoryTowbarPartsIcon,
      transmission: inventoryTransmissionIcon,
      trims: inventoryTrimsIcon,
      tyres_and_alloys: inventoryTyresAndAlloysIcon,
      universal: inventoryUniversalIcon,
      wheels: inventoryWheelsIcon,
      windscreen_cleaning_system: inventoryWindscreenCleaningSystemIcon,
      maintenance_service_parts: inventoryMaintenanceServicePartsIcon,
      belt_chains_and_rollers: inventoryBeltChainsAndRollersIcon,
    }),
    []
  );

  useEffect(() => {
    const initPartCategories = async () => {
      setloading(true);
      showToasts("SUCCESS", "Loading...");
      try {
        const response = await getAllCategories();
        setPartTypes(
          response.data.map((cat) => ({
            ...cat,
            icon: categoryImages[cat.name],
            name: cat.name.split("_").join(" "),
          }))
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }
      setloading(false);
    };
    initPartCategories();
  }, []);

  const goToParts = (type) => {
    const dataObject = {
      name: type.name,
      icon: type.icon,
      id: type._id,
    };

    navigate("/inventory/" + type._id , { state: dataObject });
  };

  return (
    <div className="pt-5 mt-4 app-background pb-5">
      <Grid
        container
        spacing={2}
        marginTop={0}
        //  marginX={0}
        // className="grid"
        // marginBottom={10}
        paddingX={10}
        sx={{ height: "auto" }}
      >
        {/* {
        partTypes.map(()=>{ */}
        {partTypes?.map((type) => (
          <Grid
            item
            lg={3}
            xs={12}
            md={6}
            sm={12}
            sx={{
              display: "flex",
            }}
          >
            <ButtonBase
              sx={{
                display: "flex",
                flexDirection: "collumn",
                alignItems: "center",
                backgroundColor: "rgb(255,255,255)",
                // border:'1px solid black',
                width: "100%",
                fontFamily: "Poppins",
                paddingY: "20px",
                fontSize: "15px",
                transition: "all 0.5s ease-in-out",
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.05)",
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(163,167,171,1) 100%)",
                  color: "white",
                },
              }}
              onClick={() => {
                goToParts(type);
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <img src={type.icon} className="category-part-icon" />
                <div className="mt-3">{type.name}</div>
              </div>
            </ButtonBase>
          </Grid>
        ))}
        {/* <Grid item lg={4} xs={12} md={6} sm={12}>
          <ButtonBase
            sx={{
              width: "100%",
              backgroundImage: `url('https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?w=1060&t=st=1689698865~exp=1689699465~hmac=e990e8a700627dcaaebd0e53824a52dc68c7ef5687dcbd4123105af36a10aed4')`,
              height: 200,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              fontFamily: "poppins",
              transition: "all 0.3s ease-in-out",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
                transform: "scale(1.01)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#2d2e2f", // Replace with your desired color and opacity
                opacity: 0.6,
                transition: "opacity 0.3s ease-in-out",
                zIndex: 1,
              },
            }}
            // onClick={(event) => {
            //   onGarageSelect(item);
            // }}
          >
            <Box>
              <div className="bg-success">item</div>
            </Box>
          </ButtonBase>
        </Grid> */}
      </Grid>
    </div>
  );
}
