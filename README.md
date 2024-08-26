# Welcome to the EVE Online Market Order Calculator

This is a simple tool to help you calculate the total cargo volume of a multi-buy market order in EVE Online.
It is designed to be used with the in-game Export functionality of the multi-buy market order scrren.

## Example Multi-Buy Market Order

E.g. this copy-paste from the in-game Export functionality:

```
ML-3 Scoped Survey Scanner	1	4.500,00	4.500,00
Miner II	2	1.179.000,00	2.358.000,00
Small Core Defense Field Extender I	2	499.900,00	999.800,00
Small EM Shield Reinforcer I	1	57.990,00	57.990,00
Medium Azeotropic Restrained Shield Extender	1	2.389.000,00	2.389.000,00
Total:			5.809.290,00
```

will result in a total cargo volume of 40.00 m³:

```
ML-3 Scoped Survey Scanner: 5.00 m³ * 1 = 5.00 m³
Miner II: 5.00 m³ * 2 = 10.00 m³
Small Core Defense Field Extender I: 5.00 m³ * 2 = 10.00 m³
Small EM Shield Reinforcer I: 5.00 m³ * 1 = 5.00 m³
Medium Azeotropic Restrained Shield Extender: 10.00 m³ * 1 = 10.00 m³
Total: 40.00 m³
```
