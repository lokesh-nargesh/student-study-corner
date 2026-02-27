package com.studymaterial.platform.controller;

import com.studymaterial.platform.dto.StudyMaterialDTO;
import com.studymaterial.platform.entity.MaterialType;
import com.studymaterial.platform.entity.StudyMaterial;
import com.studymaterial.platform.mapper.StudyMaterialMapper;
import com.studymaterial.platform.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/materials")
public class MaterialController {
    @Autowired
    StudyMaterialService materialService;

    @Autowired
    StudyMaterialMapper materialMapper;

    @GetMapping("/approved")
    public ResponseEntity<List<StudyMaterialDTO>> getApproved() {
        return ResponseEntity.ok(materialService.getAllApprovedMaterials().stream()
                .map(materialMapper::toDTO).collect(Collectors.toList()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudyMaterialDTO>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) MaterialType type) {
        return ResponseEntity.ok(materialService.searchMaterials(title, subjectId, type).stream()
                .map(materialMapper::toDTO).collect(Collectors.toList()));
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestBody StudyMaterial material, Principal principal) {
        return ResponseEntity.ok(materialMapper.toDTO(materialService.uploadMaterial(material, principal.getName())));
    }

    @GetMapping("/my-uploads")
    public ResponseEntity<List<StudyMaterialDTO>> getMyUploads(Principal principal) {
        return ResponseEntity.ok(materialService.getMyUploads(principal.getName()).stream()
                .map(materialMapper::toDTO).collect(Collectors.toList()));
    }

    @PostMapping("/download/{id}")
    public ResponseEntity<?> incrementDownload(@PathVariable Long id) {
        materialService.incrementDownloadCount(id);
        return ResponseEntity.ok("Count incremented");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        materialService.deleteMaterial(id, principal.getName());
        return ResponseEntity.ok("Deleted");
    }
}
